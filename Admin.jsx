import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, planners } from './planners.js'
import { useImageStore } from './ImageStore.jsx'
import SEO from './SEO.jsx'

function UploadSlot({ label, sublabel, slotKey }) {
  const { images, setImage, removeImage } = useImageStore()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const current = images[slotKey]

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      e.target.value = ''
      return
    }
    setError('')
    setBusy(true)
    try {
      await setImage(slotKey, file)
    } catch (err) {
      setError(err.message || 'Upload failed.')
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }

  async function handleRemove() {
    setBusy(true)
    setError('')
    try {
      await removeImage(slotKey)
    } catch (err) {
      setError(err.message || 'Could not remove image.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-xl bg-surface-card-dark border border-hairline-on-dark p-4 flex gap-4">
      <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-surface-elevated-dark flex items-center justify-center">
        {current ? (
          <img src={current} alt={label} className="w-full h-full object-cover" />
        ) : (
          <span className="text-muted text-xs text-center px-1">No image</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-body font-semibold text-sm truncate">{label}</p>
        {sublabel && <p className="text-muted text-xs mt-0.5">{sublabel}</p>}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <label
            className={`rounded-md bg-primary hover:bg-primary-active text-on-primary text-xs font-semibold px-3 py-2 transition-colors ${
              busy ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {busy ? 'Working…' : current ? 'Replace image' : 'Upload image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              disabled={busy}
            />
          </label>
          {current && (
            <button
              onClick={handleRemove}
              disabled={busy}
              className="rounded-md border border-hairline-on-dark text-muted hover:text-body hover:border-body text-xs font-semibold px-3 py-2 transition-colors disabled:opacity-60"
            >
              Remove
            </button>
          )}
        </div>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>
    </div>
  )
}

function Dashboard() {
  const { logout, resetAll, ready, loadError } = useImageStore()
  const [confirmingReset, setConfirmingReset] = useState(false)
  const [resetError, setResetError] = useState('')
  const [resetting, setResetting] = useState(false)

  async function handleReset() {
    if (!confirmingReset) {
      setConfirmingReset(true)
      return
    }
    setResetting(true)
    setResetError('')
    try {
      await resetAll()
      setConfirmingReset(false)
    } catch (err) {
      setResetError(err.message || 'Reset failed.')
    } finally {
      setResetting(false)
    }
  }

  return (
    <div className="bg-canvas-dark min-h-screen">
      <SEO title="Admin Dashboard" description="Internal image management dashboard." path="/admin" noindex />
      <header className="h-16 border-b border-hairline-on-dark flex items-center">
        <div className="mx-auto max-w-5xl w-full px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="18" fill="none" stroke="#FCD535" strokeWidth="5" />
              <circle cx="32" cy="14" r="4.5" fill="#FCD535" />
            </svg>
            <span className="font-display font-extrabold text-primary tracking-tight text-base">
              VELVET & VOWS
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-muted hover:text-body">
              View site
            </Link>
            <button onClick={logout} className="text-sm font-medium text-muted hover:text-body">
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 md:px-6 py-10">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-body">Image Dashboard</h1>
        <p className="mt-2 text-muted text-sm max-w-2xl">
          Upload photos for each event category and planner. Images upload to shared cloud
          storage and appear for every visitor — homepage ring gallery, category grid, and
          directory cards update instantly. Large photos are resized automatically.
        </p>

        {!ready && <p className="mt-6 text-sm text-muted">Loading current images…</p>}
        {loadError && (
          <p className="mt-6 text-sm text-red-400 max-w-2xl">{loadError}</p>
        )}

        <section className="mt-10">
          <h2 className="font-display font-bold text-body text-lg mb-1">Event Categories</h2>
          <p className="text-muted text-xs mb-4">
            Used in the homepage ring gallery and the featured categories grid.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((c) => (
              <UploadSlot key={c.id} label={c.title} sublabel={c.blurb} slotKey={`category:${c.id}`} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display font-bold text-body text-lg mb-1">Planners</h2>
          <p className="text-muted text-xs mb-4">
            Used on the directory cards and each planner's booking page.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {planners.map((p) => (
              <UploadSlot
                key={p.id}
                label={p.name}
                sublabel={`${p.category} · ${p.city}`}
                slotKey={`planner:${p.id}`}
              />
            ))}
          </div>
        </section>

        <section className="mt-10 pt-8 border-t border-hairline-on-dark">
          <button
            onClick={handleReset}
            disabled={resetting}
            className="rounded-md border border-red-400/40 text-red-400 text-sm font-semibold px-4 py-2.5 hover:bg-red-400/10 transition-colors disabled:opacity-60"
          >
            {resetting
              ? 'Removing…'
              : confirmingReset
              ? 'Click again to confirm — remove all images'
              : 'Reset all images'}
          </button>
          {confirmingReset && !resetting && (
            <button
              onClick={() => setConfirmingReset(false)}
              className="ml-3 text-sm text-muted hover:text-body"
            >
              Cancel
            </button>
          )}
          {resetError && <p className="mt-2 text-xs text-red-400">{resetError}</p>}
        </section>
      </main>
    </div>
  )
}

function Login() {
  const { login } = useImageStore()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(password)
    } catch (err) {
      setError(err.message || 'Incorrect password.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="bg-canvas-dark min-h-screen flex items-center justify-center px-4">
      <SEO title="Admin Login" description="Internal image management dashboard." path="/admin" noindex />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-surface-card-dark border border-hairline-on-dark p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <svg width="24" height="24" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="18" fill="none" stroke="#FCD535" strokeWidth="5" />
            <circle cx="32" cy="14" r="4.5" fill="#FCD535" />
          </svg>
          <span className="font-display font-extrabold text-primary tracking-tight">
            Admin Login
          </span>
        </div>
        <label className="text-xs font-semibold text-muted" htmlFor="password">
          Dashboard password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-md bg-surface-elevated-dark border border-hairline-on-dark text-body text-sm px-3.5 py-2.5 focus:border-primary outline-none"
        />
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full rounded-pill bg-primary hover:bg-primary-active text-on-primary font-semibold text-sm py-3 transition-colors disabled:opacity-60"
        >
          {busy ? 'Checking…' : 'Enter Dashboard'}
        </button>
        <Link to="/" className="mt-4 block text-center text-xs text-muted hover:text-body">
          &larr; Back to site
        </Link>
      </form>
    </div>
  )
}

export default function Admin() {
  const { token } = useImageStore()
  return token ? <Dashboard /> : <Login />
}
