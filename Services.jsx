import { Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import SEO from './SEO.jsx'
import { categories } from './planners.js'
import { useImageStore } from './ImageStore.jsx'
import { categoryImages, bannerImages } from './images.js'

export default function Services() {
  const { images } = useImageStore()

  return (
    <div className="bg-canvas-dark min-h-screen">
      <SEO
        title="Services — Weddings, Corporate Summits, Dinners, Galas"
        description="Browse every event category Velvet & Vows curates: luxury weddings, corporate summits, private dinners, fashion shows, milestone birthdays, and brand launches."
        path="/services"
      />
      <Navbar />

      <section className="relative h-64 md:h-80 overflow-hidden border-b border-hairline-on-dark">
        <img
          src={bannerImages.services}
          alt="Event services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute inset-0 bg-canvas-dark/70" />
        <div className="relative h-full mx-auto max-w-7xl px-4 md:px-6 flex flex-col justify-center">
          <span className="text-primary text-xs font-bold tracking-widest uppercase">
            Our Services
          </span>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-body">
            Every kind of event, one standard of craft.
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-16">
          {categories.map((c, i) => (
            <div
              key={c.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="rounded-xl overflow-hidden border border-hairline-on-dark h-64 md:h-80">
                <img
                  src={images[`category:${c.id}`] || categoryImages[c.id]}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="rounded-lg bg-surface-card-dark border border-hairline-on-dark text-primary text-xs font-semibold px-3 py-1">
                  From <span className="font-num">${c.from.toLocaleString()}</span>
                </span>
                <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold text-body">
                  {c.title}
                </h2>
                <p className="mt-3 text-muted leading-relaxed">{c.blurb}</p>
                <Link
                  to={`/planners?category=${encodeURIComponent(c.title)}`}
                  className="mt-5 inline-block rounded-pill bg-primary hover:bg-primary-active text-on-primary font-semibold text-sm px-6 py-3 transition-colors"
                >
                  Browse {c.title} Planners
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
