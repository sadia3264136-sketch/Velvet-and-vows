import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CONTACT_EMAIL } from './planners.js'

const links = [
  { label: 'Services', to: '/services' },
  { label: 'Planners', to: '/planners' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* Slim utility strip — the "new way" touch: a thin identity bar above the main nav */}
      <div className="hidden md:block bg-surface-elevated-dark border-b border-hairline-on-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-9 flex items-center justify-between text-xs">
          <span className="text-muted tracking-wide">
            Vetted studios only · No open sign-ups
          </span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-muted hover:text-primary transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="h-16 bg-canvas-dark border-b border-hairline-on-dark">
        <div className="mx-auto max-w-7xl h-full px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="18" fill="none" stroke="#FCD535" strokeWidth="5" />
              <circle cx="32" cy="14" r="4.5" fill="#FCD535" />
            </svg>
            <span className="font-display tracking-tight text-lg font-extrabold text-primary">
              VELVET & VOWS
            </span>
          </Link>

          {/* Nav links sit inside a rounded "island" — distinct from a plain flat row */}
          <nav className="hidden lg:flex items-center gap-1 rounded-pill bg-surface-card-dark border border-hairline-on-dark px-1.5 py-1.5">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-pill px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-on-primary'
                      : 'text-body/80 hover:text-primary'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Consultation Request - VELVET %26 VOWS`}
              className="rounded-pill bg-primary hover:bg-primary-active text-on-primary text-sm font-semibold px-5 py-2.5 transition-colors"
            >
              Book Consultation
            </a>
          </div>

          <button
            className="lg:hidden text-body p-2"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-canvas-dark border-b border-hairline-on-dark px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-body/80 hover:text-primary transition-colors"
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-hairline-on-dark">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Consultation Request - VELVET %26 VOWS`}
              className="rounded-pill bg-primary hover:bg-primary-active text-on-primary text-sm font-semibold px-5 py-2.5 text-center transition-colors"
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
