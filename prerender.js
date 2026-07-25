// Runs after the client + SSR builds (see the "build" script in
// package.json). For every route below, it renders real HTML + the
// correct <title>/meta/OG tags at build time and writes a static
// index.html into dist/ at that route's path — so search engines and
// link-preview bots that don't execute JavaScript still see fully
// correct, per-page SEO content. The client bundle then hydrates
// normally on top of that HTML, so the site stays fully interactive.

import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { planners } from './planners.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')

const staticRoutes = ['/', '/about', '/services', '/gallery', '/contact', '/planners']
const plannerRoutes = planners.map((p) => `/planners/${p.id}`)
const routes = [...staticRoutes, ...plannerRoutes]

function helmetTagsToString(helmet) {
  if (!helmet) return ''
  return [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n    ')
}

async function main() {
  const { render } = await import('./dist-ssr/entry-server.js')
  const template = await readFile(path.join(distDir, 'index.html'), 'utf-8')

  for (const route of routes) {
    let html, helmet
    try {
      ;({ html, helmet } = render(route))
    } catch (err) {
      console.error(`Prerender failed for ${route}:`, err.message)
      continue
    }

    const headTags = helmetTagsToString(helmet)

    // index.html has a placeholder comment marking where per-route SEO tags
    // belong (see index.html) — replace it with this route's real tags, and
    // drop the rendered app markup into #root.
    const page = template
      .replace(
        '<!-- title/description/canonical/OG/Twitter/JSON-LD are injected per-route by prerender.js at build time -->',
        headTags
      )
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

    if (!page.includes('<title')) {
      throw new Error(
        `SEO placeholder comment not found in index.html template for route "${route}" — check the comment text still matches prerender.js.`
      )
    }

    const outPath =
      route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.slice(1), 'index.html')

    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, page, 'utf-8')
    console.log(`Prerendered ${route} -> ${path.relative(distDir, outPath)}`)
  }

  console.log(`\nPrerendered ${routes.length} routes.`)
}

main().catch((err) => {
  console.error('Prerender script failed:', err)
  process.exit(1)
})
