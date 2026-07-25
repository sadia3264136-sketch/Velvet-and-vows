import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { ImageStoreProvider } from './ImageStore.jsx'
import './index.css'

const rootEl = document.getElementById('root')
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ImageStoreProvider>
          <App />
        </ImageStoreProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// Prerendered routes (see prerender.js) ship real server-rendered markup
// inside #root, so we hydrate it instead of wiping and re-rendering from
// scratch. Routes with no prerendered file (e.g. /admin) fall back to the
// homepage's prerendered shell via the Vercel SPA rewrite; React detects
// the mismatch on those and safely re-renders client-side instead.
if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootEl, app)
} else {
  ReactDOM.createRoot(rootEl).render(app)
}
