import { StrictMode } from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { ImageStoreProvider } from './ImageStore.jsx'

// Used only at build time by prerender.js — renders the app to a plain
// HTML string for a given URL, plus the Helmet head tags that route
// produced. No effects/data-fetching run here (renderToString is
// synchronous), which is fine: every page's default content (including
// default stock photography) is available synchronously, and the client
// bundle takes over normally after hydration to fetch live admin images.
export function render(url) {
  const helmetContext = {}
  const html = ReactDOMServer.renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <ImageStoreProvider>
            <App />
          </ImageStoreProvider>
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  )
  return { html, helmet: helmetContext.helmet }
}
