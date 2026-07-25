import { Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import RingGallery from './RingGallery.jsx'
import StatsBand from './StatsBand.jsx'
import CategoryGrid from './CategoryGrid.jsx'
import Footer from './Footer.jsx'
import SEO, { SITE_URL } from './SEO.jsx'
import { galleryImages } from './images.js'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Velvet & Vows',
  url: SITE_URL,
  description:
    'An elite local platform connecting clients with vetted event planners, wedding stylists, and corporate gala curators.',
  sameAs: [],
}

export default function Home() {
  return (
    <div className="bg-canvas-dark min-h-screen">
      <SEO
        title="Elite Event Planners, Wedding Stylists & Gala Curators"
        description="Connect with top-tier local event planners, wedding stylists, and corporate gala curators. Vetted studios, transparent pricing, curated access."
        path="/"
        jsonLd={jsonLd}
      />
      <Navbar />

      <section className="pt-14 pb-16 md:pt-20 md:pb-24 border-b border-hairline-on-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left animate-fade-up">
            <span className="inline-block rounded-pill bg-surface-card-dark border border-hairline-on-dark text-primary text-xs font-semibold px-4 py-1.5 mb-6">
              Trusted by 45+ elite local planners
            </span>
            <h1 className="font-display font-extrabold text-body leading-[1.05] text-4xl md:text-5xl xl:text-hero">
              We curate <span className="text-primary">unforgettable</span> events.
            </h1>
            <p className="mt-5 text-muted text-base md:text-lg max-w-lg mx-auto lg:mx-0">
              Connect with top-tier local event planners, wedding stylists, and gala curators —
              vetted for craft, not just for signing up.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-3 justify-center lg:justify-start">
              <Link
                to="/planners"
                className="rounded-pill bg-primary hover:bg-primary-active text-on-primary font-bold text-sm md:text-base px-8 py-4 transition-colors"
              >
                EXPLORE EVENT GALLERIES
              </Link>
              <Link
                to="/gallery"
                className="rounded-pill border border-hairline-on-dark hover:border-primary text-body font-semibold text-sm md:text-base px-8 py-4 transition-colors"
              >
                View Past Events
              </Link>
            </div>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-xs text-muted">
              <span className="flex items-baseline gap-1.5">
                <span className="font-num text-primary font-bold text-sm">1,250+</span>
                events delivered
              </span>
              <span className="w-px h-4 bg-hairline-on-dark" />
              <span className="flex items-baseline gap-1.5">
                <span className="font-num text-primary font-bold text-sm">4.9</span>
                avg. planner rating
              </span>
            </div>
          </div>

          <RingGallery />
        </div>
      </section>

      <StatsBand />
      <CategoryGrid />

      <section className="bg-canvas-dark py-16 md:py-24 border-t border-hairline-on-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                From the field
              </span>
              <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-body">
                Recent Event Photography
              </h2>
            </div>
            <Link
              to="/gallery"
              className="hidden md:inline-block text-sm font-semibold text-primary hover:text-primary-active"
            >
              Full gallery &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.slice(0, 4).map((g) => (
              <div key={g.id} className="rounded-lg overflow-hidden border border-hairline-on-dark aspect-square">
                <img src={g.src} alt={g.category} loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas-dark py-16 md:py-24 border-t border-hairline-on-dark">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-body">
            Curated access, not a marketplace crowd.
          </h2>
          <p className="mt-4 text-muted text-sm md:text-base leading-relaxed">
            Every studio on Velvet & Vows is personally vetted for craftsmanship, reliability,
            and taste before they're allowed to take a single booking. No open sign-ups, no
            unverified listings — just the planners your event actually deserves.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-block text-sm font-semibold text-primary hover:text-primary-active"
          >
            More about our vetting process &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
