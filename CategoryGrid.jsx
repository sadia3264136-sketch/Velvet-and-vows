import { Link } from 'react-router-dom'
import { categories } from './planners.js'
import { useImageStore } from './ImageStore.jsx'

export default function CategoryGrid() {
  const { images } = useImageStore()
  return (
    <section className="bg-canvas-dark py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-body">
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
              className="group relative overflow-hidden rounded-xl bg-surface-card-dark border border-hairline-on-dark p-6 hover:border-primary transition-colors"
            >
              {images[`category:${c.id}`] && (
                <>
                  <img
                    src={images[`category:${c.id}`]}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 bg-canvas-dark/70 group-hover:bg-canvas-dark/60 transition-colors" />
                </>
              )}
              <div className="relative flex items-center justify-between">
                <span className="rounded-lg bg-surface-elevated-dark text-primary text-xs font-semibold px-3 py-1">
                  From <span className="font-num">${c.from.toLocaleString()}</span>
                </span>
                <span className="text-muted group-hover:text-primary transition-colors" aria-hidden="true">
                  &rarr;
                </span>
              </div>
              <h3 className="relative mt-5 font-display text-lg font-bold text-body">{c.title}</h3>
              <p className="relative mt-2 text-sm text-muted leading-relaxed">{c.blurb}</p>
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
