import { useState } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import SEO from './SEO.jsx'
import { galleryImages, bannerImages } from './images.js'
import { categories } from './planners.js'

const filterOptions = ['All', ...categories.map((c) => c.title)]

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const filtered =
    filter === 'All' ? galleryImages : galleryImages.filter((g) => g.category === filter)

  return (
    <div className="bg-canvas-dark min-h-screen">
      <SEO
        title="Event Photography Gallery"
        description="A curated gallery of recent weddings, corporate summits, private dinners, fashion shows, and brand launches produced by Velvet & Vows planners."
        path="/gallery"
      />
      <Navbar />

      <section className="relative h-64 md:h-80 overflow-hidden border-b border-hairline-on-dark">
        <img
          src={bannerImages.gallery}
          alt="Event gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute inset-0 bg-canvas-dark/70" />
        <div className="relative h-full mx-auto max-w-7xl px-4 md:px-6 flex flex-col justify-center">
          <span className="text-primary text-xs font-bold tracking-widest uppercase">
            Gallery
          </span>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-body">
            A look at recent events.
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-wrap gap-2 mb-8">
            {filterOptions.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-pill text-xs font-semibold px-4 py-2 transition-colors border ${
                  filter === f
                    ? 'bg-primary border-primary text-on-primary'
                    : 'border-hairline-on-dark text-muted hover:text-body hover:border-body'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
            {filtered.map((g) => (
              <div
                key={g.id}
                className="mb-4 break-inside-avoid rounded-lg overflow-hidden border border-hairline-on-dark relative group"
              >
                <img src={g.src} alt={g.category} loading="lazy" className="w-full h-auto object-cover" />
                <span className="absolute inset-x-0 bottom-0 bg-canvas-dark/80 text-body text-xs font-semibold px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {g.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
