import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { planners, categories } from './planners.js'
import { useImageStore } from './ImageStore.jsx'

const budgetTiers = ['$', '$$', '$$$', '$$$$']
const cities = [...new Set(planners.map((p) => p.city))]
const categoryTitles = categories.map((c) => c.title)

export default function Directory() {
  const { images } = useImageStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [budget, setBudget] = useState('')
  const [eventType, setEventType] = useState(searchParams.get('category') || '')
  const [city, setCity] = useState('')

  const filtered = useMemo(() => {
    return planners.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      const matchesBudget = !budget || p.budgetTier === budget
      const matchesType = !eventType || p.category === eventType
      const matchesCity = !city || p.city === city
      return matchesQuery && matchesBudget && matchesType && matchesCity
    })
  }, [query, budget, eventType, city])

  return (
    <div className="bg-canvas-dark min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-canvas-dark border-b border-hairline-on-dark py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-body">
            Event Planners Directory
          </h1>
          <p className="mt-2 text-muted text-sm md:text-base">
            {filtered.length} planner{filtered.length !== 1 ? 's' : ''} matching your criteria
          </p>

          <div className="mt-6 flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search event planners, wedding stylists..."
                className="w-full rounded-md bg-surface-card-dark border border-hairline-on-dark text-body placeholder:text-muted text-sm pl-11 pr-4 py-3 focus:border-primary outline-none transition-colors"
              />
            </div>

            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="rounded-md bg-surface-card-dark border border-hairline-on-dark text-body text-sm px-4 py-3 focus:border-primary outline-none transition-colors"
            >
              <option value="">Budget: Any</option>
              {budgetTiers.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="rounded-md bg-surface-card-dark border border-hairline-on-dark text-body text-sm px-4 py-3 focus:border-primary outline-none transition-colors"
            >
              <option value="">Event Type: Any</option>
              {categoryTitles.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-md bg-surface-card-dark border border-hairline-on-dark text-body text-sm px-4 py-3 focus:border-primary outline-none transition-colors"
            >
              <option value="">City: Any</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="flex-1 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-body font-semibold">No planners match those filters.</p>
              <p className="mt-2 text-muted text-sm">
                Try widening your budget or city selection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  to={`/planners/${p.id}`}
                  className="group rounded-xl bg-surface-card-dark border border-hairline-on-dark overflow-hidden hover:border-primary transition-colors flex flex-col"
                >
                  <div className="h-36 bg-surface-elevated-dark flex items-center justify-center overflow-hidden">
                    {images[`planner:${p.id}`] ? (
                      <img
                        src={images[`planner:${p.id}`]}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-display text-2xl font-extrabold text-primary/80">
                        {p.name
                          .split(' ')
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join('')}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-surface-elevated-dark text-primary text-xs font-semibold px-2.5 py-1">
                        {p.category}
                      </span>
                      <span className="font-num text-xs text-muted">{p.city}</span>
                    </div>
                    <h3 className="mt-4 font-display font-bold text-body">{p.name}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="font-num text-primary font-semibold">{p.rating}</span>
                      <span className="text-muted">({p.reviews} reviews)</span>
                      <span className="text-muted">·</span>
                      <span className="text-muted">{p.budgetTier}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] rounded-md bg-canvas-dark border border-hairline-on-dark text-muted px-2 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-5 flex items-center justify-between">
                      <span className="font-num text-body font-semibold">
                        From ${p.price.toLocaleString()}
                      </span>
                      <span className="rounded-pill bg-primary group-hover:bg-primary-active text-on-primary text-xs font-semibold px-4 py-2 transition-colors">
                        View & Book
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
