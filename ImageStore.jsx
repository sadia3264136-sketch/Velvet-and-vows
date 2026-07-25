import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ImageStoreContext = createContext(null)
const TOKEN_KEY = 'vv_admin_token'
const TOKEN_EXP_KEY = 'vv_admin_token_expires'

function loadStoredToken() {
  if (typeof window === 'undefined') return null
  try {
    const token = sessionStorage.getItem(TOKEN_KEY)
    const expires = Number(sessionStorage.getItem(TOKEN_EXP_KEY) || 0)
    if (!token || !expires || Date.now() > expires) return null
    return token
  } catch {
    return null
  }
}

// Resizes + compresses an uploaded image file client-side so we never send
// a giant camera photo straight to the API / blob storage.
export function fileToCompressedDataUrl(file, maxDim = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read that file.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('Could not decode that image.'))
      img.onload = () => {
        let { width, height } = img
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export function ImageStoreProvider({ children }) {
  const [images, setImages] = useState({})
  const [ready, setReady] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [token, setToken] = useState(() => loadStoredToken())

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/images')
      if (!res.ok) throw new Error('request failed')
      const data = await res.json()
      setImages(data.images || {})
      setLoadError('')
    } catch {
      setLoadError(
        "Couldn't reach the image server. If you're running `npm run dev`, use `vercel dev` instead so the /api routes work locally."
      )
    } finally {
      setReady(true)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const login = useCallback(async (password) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Incorrect password.')
    sessionStorage.setItem(TOKEN_KEY, data.token)
    sessionStorage.setItem(TOKEN_EXP_KEY, String(data.expires))
    setToken(data.token)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(TOKEN_EXP_KEY)
    setToken(null)
  }, [])

  const authedFetch = useCallback(
    async (url, body) => {
      if (!token) throw new Error('Not authenticated.')
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (res.status === 401) {
        logout()
        throw new Error('Your session expired — please log in again.')
      }
      if (!res.ok) throw new Error(data.error || 'Request failed.')
      return data
    },
    [token, logout]
  )

  const setImage = useCallback(
    async (slotKey, file) => {
      const dataUrl = await fileToCompressedDataUrl(file)
      const data = await authedFetch('/api/upload', { slotKey, dataUrl })
      setImages((prev) => ({ ...prev, [slotKey]: data.url }))
    },
    [authedFetch]
  )

  const removeImage = useCallback(
    async (slotKey) => {
      await authedFetch('/api/delete', { slotKey })
      setImages((prev) => {
        const next = { ...prev }
        delete next[slotKey]
        return next
      })
    },
    [authedFetch]
  )

  const resetAll = useCallback(async () => {
    await authedFetch('/api/reset', {})
    setImages({})
  }, [authedFetch])

  return (
    <ImageStoreContext.Provider
      value={{ images, ready, loadError, refresh, token, login, logout, setImage, removeImage, resetAll }}
    >
      {children}
    </ImageStoreContext.Provider>
  )
}

export function useImageStore() {
  const ctx = useContext(ImageStoreContext)
  if (!ctx) throw new Error('useImageStore must be used within ImageStoreProvider')
  return ctx
}
