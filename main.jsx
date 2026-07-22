import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ImageStoreProvider } from './ImageStore.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ImageStoreProvider>
        <App />
      </ImageStoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
