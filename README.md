# VELVET & VOWS

An elite local platform for Event Planners, Wedding Stylists, and Corporate Gala Curators — built with React, Vite, Tailwind CSS, and a Binance-inspired flat-surface design system.

## Pages

- `/` — Homepage: two-column hero (real photography ring gallery + headline/CTAs), stats band, featured categories, recent event photography strip, and light footer.
- `/about` — Our story, vetting standards, and what makes the platform curated rather than open sign-up.
- `/services` — Deep-dive on every event category with photography, starting price, and a direct link into the directory.
- `/gallery` — Filterable masonry gallery of event photography by category.
- `/contact` — General inquiry form (routes to `khaanii654321@gmail.com`).
- `/planners` — Event Planners Directory with search + budget/event-type/city filters.
- `/planners/:id` — Transactional light-mode booking page with pricing tiers, availability picker, and inquiry form (routes to `khaanii654321@gmail.com`).
- `/admin` — Password-protected image dashboard, backed by Vercel Blob (see below).

Every page shares the same two-tier header (slim utility strip + pill-style nav island) and the same light footer, for a consistent feel site-wide.

## Photography

Every category, planner, and page banner ships with a real default photo out of the box —
sourced from **Lorem Picsum** (`picsum.photos`), a free image service with no API key and no
attribution required. They're neutral placeholders so the site never looks empty; replace any
of them with real branded photography any time via the `/admin` dashboard (an admin-uploaded
photo always takes priority over the default). Defaults live in `images.js` if you want to
swap the seeds directly in code instead.

## File structure

This project uses a **flat structure** — every `.jsx`/`.js`/`.css` file lives at the project
root next to `package.json` (no `src/` folder), so it uploads cleanly via drag-and-drop or a
plain GitHub web upload with no path surprises. Two folders are kept because the tooling
requires them: `api/` (Vercel Serverless Functions must live here) and `public/` (Vite's
convention for static assets like the favicon).

`entry-server.jsx` and `prerender.js` are build-time-only files that generate the static,
SEO-ready HTML described below — they never ship to the browser.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # client build + SSR build + prerender all routes to static HTML
npm run preview    # serve dist/ locally to sanity-check
```

`npm run build` is a 3-step pipeline (see `package.json`):
1. `vite build` — normal client bundle → `dist/`
2. `vite build --ssr entry-server.jsx --outDir dist-ssr` — a Node-side render bundle (build-time only, deleted automatically at the end of step 3)
3. `node prerender.js` — renders every route with React and writes real HTML files into `dist/`

If you ever just want the plain client build without prerendering (e.g. for quick local iteration), run `npm run build:client-only`.

## Admin image dashboard (shared for every visitor)

Go to `/admin` (linked at the bottom of the site footer) to upload real photos for every
event category and every planner — no code editing required. Uploaded photos are stored in
**Vercel Blob** and show up for *every* visitor on *every* device, not just the browser that
uploaded them.

### One-time setup on Vercel (required before this works)

1. Deploy the project to Vercel first (see below).
2. In the Vercel dashboard, open your project → **Storage** tab → **Create Database** →
   **Blob**. Connect it to this project. Vercel automatically adds a `BLOB_READ_WRITE_TOKEN`
   environment variable — you don't need to copy/paste anything.
3. Still in the project settings → **Environment Variables**, add:
   - `ADMIN_PASSWORD` — the password the admin dashboard requires to log in (defaults to
     `velvet2026` if you skip this — change it before giving anyone access).
   - `ADMIN_TOKEN_SECRET` — optional; any random string. If omitted, `ADMIN_PASSWORD` is
     reused to sign login sessions.
4. Redeploy (Vercel → Deployments → Redeploy) so the new environment variables take effect.

### Using it

- Open `/admin`, enter the password, and upload a photo per category or planner.
- The photo instantly appears in the homepage ring gallery, the featured categories grid,
  the directory cards, and the planner's booking page — for everyone, immediately.
- "Reset all images" clears every uploaded photo back to the default icon/initials look.
- Logging in issues a 12-hour session token (stored in `sessionStorage`); the real password
  never ships in the JavaScript bundle, and every upload/delete request is verified
  server-side in `api/_lib/auth.js`.

### Local development note

`npm run dev` (plain Vite) does **not** run the `/api/*.js` serverless functions, so the
dashboard can't load or save images that way. To test the dashboard locally, install the
Vercel CLI and run:
```bash
npm i -g vercel
vercel link      # first time only, links this folder to your Vercel project
vercel env pull  # pulls BLOB_READ_WRITE_TOKEN and your env vars into .env.local
vercel dev
```

## SEO

**This site is fully static-prerendered — every page ships as finished, crawlable HTML, not an empty `<div id="root">`.**

**On-page:**
- Every route (`Home`, `About`, `Services`, `Gallery`, `Contact`, `Directory`, `Booking`, and all 9 planner pages) has its own `<title>`, meta description, canonical URL, and Open Graph/Twitter tags via `react-helmet-async` (see `SEO.jsx`).
- Planner booking pages get dynamic, per-planner titles/descriptions plus `LocalBusiness` JSON-LD (rating, price range, city). The homepage carries `Organization` JSON-LD.
- One `<h1>` per page, descriptive `alt` text on every image, semantic heading order throughout.
- `/admin` is marked `noindex, nofollow` so it never surfaces in search results.

**Technical:**
- `public/robots.txt` — allows crawling, disallows `/admin`, points to the sitemap.
- `public/sitemap.xml` — lists every static page and all 9 planner detail pages.
- **Real prerendering, not just a JS-side title swap.** `npm run build` runs three steps: (1) the normal Vite client build, (2) a Vite SSR build of `entry-server.jsx`, (3) `prerender.js`, which renders every route to a full HTML string with React and writes it to disk — `dist/about/index.html`, `dist/planners/aria-costantini/index.html`, etc. Any crawler, bot, or link-preview scraper that fetches these URLs gets complete markup and the exact per-page `<title>`/meta/OG/JSON-LD immediately, with no JavaScript execution required. There's still zero server running at request time — Vercel just serves these as static files, so hosting stays free/static.
- Once the page loads in a real browser, React mounts on top and the site becomes the fully interactive SPA as before (search/filter, admin dashboard, forms, etc.) — prerendering only affects the very first HTML response.
- `/admin` is intentionally **not** prerendered (it's an auth-gated tool, not a page search engines should ever show) — it still works as a normal SPA route once JavaScript loads, and `robots.txt`/`noindex` keep it out of search results either way. Because it falls back to the homepage's prerendered HTML shell before React takes over, direct visits may show a brief flash of the homepage before correcting to the dashboard — harmless, and irrelevant to SEO since this route is deliberately excluded from indexing anyway.

**Before going live, update these:**
1. Replace `https://velvetandvows.vercel.app` with your real domain in `SEO.jsx` (`SITE_URL`), `public/robots.txt`, and `public/sitemap.xml`, then rebuild so the new domain gets baked into every prerendered page.
2. Add a real `public/og-image.jpg` (1200×630) — `SEO.jsx` references `/og-image.jpg` as the default social share image.
3. If you add more planners in `planners.js`, add their routes to the `routes` array in `prerender.js` so they get prerendered too (and to `public/sitemap.xml`).

## Deploy to Vercel

This project includes a `vercel.json` preconfigured for a Vite SPA (build command, output directory, and rewrites for client-side routing).

**Option A — Vercel CLI**
```bash
npm i -g vercel
vercel --prod
```

**Option B — Vercel Dashboard**
1. Push this folder to a GitHub repo (or drag-and-drop the folder into the Vercel dashboard).
2. Import the project in Vercel.
3. Framework preset: Vite (auto-detected). Build command `npm run build`, output directory `dist` (already set in `vercel.json`).
4. Deploy.

## Design tokens

All colors, radii, and fonts live in `tailwind.config.js` and match the brief's design system exactly (Binance Yellow `#FCD535`, Canvas Dark `#0b0e11`, etc.). Update tokens there to restyle the whole site consistently.
