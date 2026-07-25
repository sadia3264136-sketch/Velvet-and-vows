import { Link } from 'react-router-dom'
import { categories } from './planners.js'
import { useImageStore } from './ImageStore.jsx'
import { categoryImages } from './images.js'

export default function CategoryGrid() {
  const { images } = useImageStore()
  return (
    <section className="bg-canvas-dark py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              What we curate
            </span>
            <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-body">
              Featured Categories
            </h2>
            <p className="mt-2 text-muted text-sm md:text-base">
              Flat-rate packages, vetted specialists, transparent pricing.
            </p>
          </div>
          <Link
            to="/planners"
            className="hidden md:inline-block text-sm font-semibold text-primary hover:text-primary-active"
          >
            View all planners &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/planners?category=${encodeURIComponent(c.title)}`}
              className="group overflow-hidden rounded-xl bg-surface-card-dark border border-hairline-on-dark hover:border-primary transition-colors"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={images[`category:${c.id}`] || categoryImages[c.id]}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-surface-card-dark via-transparent to-transparent" />
                <span className="absolute top-3 right-3 rounded-lg bg-canvas-dark/80 text-primary text-xs font-semibold px-3 py-1">
                  From <span className="font-num">${c.from.toLocaleString()}</span>
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-body">{c.title}</h3>
                  <span className="text-muted group-hover:text-primary transition-colors" aria-hidden="true">
                    &rarr;
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted leading-relaxed">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/planners"
          className="md:hidden mt-8 inline-block text-sm font-semibold text-primary hover:text-primary-active"
        >
          View all planners &rarr;
        </Link>
      </div>
    </section>
  )
}

