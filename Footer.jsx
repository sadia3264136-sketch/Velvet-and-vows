import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from './planners.js'

const columns = [
  {
    title: 'Community',
    links: [
      { label: 'Planner Stories', to: '/gallery' },
      { label: 'Event Journal', to: '/gallery' },
      { label: 'Style Guides', to: '/services' },
      { label: 'Referral Program', to: '/contact' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { label: 'Our Story', to: '/about' },
      { label: 'Vetting Standards', to: '/about' },
      { label: 'Careers', to: '/contact' },
      { label: 'Press', to: '/contact' },
    ],
  },
  {
    title: 'Planner Solutions',
    links: [
      { label: 'List Your Studio', to: '/contact' },
      { label: 'Pricing Tools', to: '/services' },
      { label: 'Client CRM', to: '/contact' },
      { label: 'Verified Badge', to: '/about' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Luxury Weddings', to: '/planners?category=Luxury Weddings' },
      { label: 'Corporate Summits', to: '/planners?category=Corporate Summits' },
      { label: 'Private Dinners', to: '/planners?category=Private Dinners' },
      { label: 'Brand Launches', to: '/planners?category=Brand Launches' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '/contact' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Cancellations', to: '/contact' },
      { label: 'Trust & Safety', to: '/about' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', to: '/contact' },
      { label: 'Privacy Policy', to: '/contact' },
      { label: 'Cookie Policy', to: '/contact' },
      { label: 'Vendor Agreement', to: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-surface-soft-light text-ink">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted hover:text-ink transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-hairline-on-light flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="18" fill="none" stroke="#181a20" strokeWidth="5" />
              <circle cx="32" cy="14" r="4.5" fill="#181a20" />
            </svg>
            <span className="font-display font-extrabold text-ink tracking-tight text-base">
              VELVET & VOWS
            </span>
          </Link>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Velvet & Vows. All rights reserved. Inquiries:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-ink">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
