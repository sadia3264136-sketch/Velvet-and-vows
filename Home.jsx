import { Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import RingGallery from './RingGallery.jsx'
import StatsBand from './StatsBand.jsx'
import CategoryGrid from './CategoryGrid.jsx'
import Footer from './Footer.jsx'

export default function Home() {
  return (
    <div className="bg-canvas-dark min-h-screen">
      <Navbar />

      <section className="pt-14 pb-10 md:pt-20 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 flex flex-col items-center">
          <span className="rounded-pill bg-surface-card-dark border border-hairline-on-dark text-primary text-xs font-semibold px-4 py-1.5 mb-8">
            Trusted by 45+ elite local planners
          </span>

          <RingGallery />

          <Link
            to="/planners"
            className="mt-10 rounded-pill bg-primary hover:bg-primary-active text-on-primary font-bold text-sm md:text-base px-8 py-4 transition-colors"
          >
            EXPLORE EVENT GALLERIES
          </Link>
        </div>
      </section>

      <StatsBand />
      <CategoryGrid />

      <section id="about" className="bg-canvas-dark py-16 md:py-24 border-t border-hairline-on-dark">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-body">
            Curated access, not a marketplace crowd.
          </h2>
          <p className="mt-4 text-muted text-sm md:text-base leading-relaxed">
            Every studio on Velvet & Vows is personally vetted for craftsmanship, reliability,
            and taste before they're allowed to take a single booking. No open sign-ups, no
            unverified listings — just the planners your event actually deserves.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
