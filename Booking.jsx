import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import SEO from './SEO.jsx'
import { planners, CONTACT_EMAIL } from './planners.js'
import { useImageStore } from './ImageStore.jsx'
import { plannerImages } from './images.js'

export default function Booking() {
  const { id } = useParams()
  const { images } = useImageStore()
  const planner = planners.find((p) => p.id === id)
  const [selectedDate, setSelectedDate] = useState(planner?.availability?.[0] || '')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  if (!planner) {
    return <Navigate to="/planners" replace />
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Booking Inquiry: ${planner.name} — ${selectedDate}`)
    const body = encodeURIComponent(
      `Planner: ${planner.name}\nRequested date: ${selectedDate}\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={`${planner.name} — ${planner.category}`}
        description={`${planner.name} in ${planner.city}: ${planner.category} starting from $${planner.price.toLocaleString()}. ${planner.rating} rating from ${planner.reviews} reviews.`}
        path={`/planners/${planner.id}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: planner.name,
          areaServed: planner.city,
          priceRange: planner.budgetTier,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: planner.rating,
            reviewCount: planner.reviews,
          },
        }}
      />
      <Navbar />

      <div className="bg-canvas-light text-ink">
        <div className="mx-auto max-w-5xl px-4 md:px-6 pt-8">
          <Link to="/planners" className="text-sm font-medium text-muted hover:text-ink">
            &larr; All Planners
          </Link>
        </div>
        <main className="mx-auto max-w-5xl px-4 md:px-6 py-6 md:py-10 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-3">
          <div className="mb-6 rounded-xl overflow-hidden border border-hairline-on-light">
            <img
              src={images[`planner:${planner.id}`] || plannerImages[planner.id]}
              alt={planner.name}
              loading="lazy"
              className="w-full h-56 object-cover"
            />
          </div>
          <span className="rounded-lg bg-primary text-on-primary text-xs font-semibold px-2.5 py-1">
            {planner.category}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold">{planner.name}</h1>
          <p className="mt-2 text-muted text-sm">
            {planner.city} · <span className="font-num">{planner.rating}</span> (
            {planner.reviews} reviews) · {planner.budgetTier}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {planner.tags.map((t) => (
              <span
                key={t}
                className="text-xs rounded-md border border-hairline-on-light text-muted px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-hairline-on-light p-6">
            <h2 className="font-display font-bold text-lg">Package Pricing</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Starting package</span>
                <span className="font-num font-semibold">${planner.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Full-service coordination</span>
                <span className="font-num font-semibold">
                  ${Math.round(planner.price * 1.6).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">All-inclusive design + production</span>
                <span className="font-num font-semibold">
                  ${Math.round(planner.price * 2.4).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display font-bold text-lg">Availability</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {planner.availability.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                    selectedDate === d
                      ? 'bg-primary border-primary text-on-primary'
                      : 'border-hairline-on-light text-ink hover:border-ink'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-xl border border-hairline-on-light p-6 sticky top-6">
            <h2 className="font-display font-bold text-lg">Request this booking</h2>
            <p className="mt-1 text-sm text-muted">
              Sent directly to our concierge team for confirmation.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-lg bg-surface-soft-light border border-hairline-on-light p-5 text-sm">
                <p className="font-semibold">Your email client should now be open.</p>
                <p className="mt-2 text-muted">
                  If it didn't launch, email us directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted" htmlFor="name">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-md border border-hairline-on-light text-sm px-3.5 py-2.5 focus:border-ink outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-md border border-hairline-on-light text-sm px-3.5 py-2.5 focus:border-ink outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-md border border-hairline-on-light text-sm px-3.5 py-2.5 focus:border-ink outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted" htmlFor="message">
                    Tell us about your event
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-md border border-hairline-on-light text-sm px-3.5 py-2.5 focus:border-ink outline-none resize-none"
                  />
                </div>
                <div className="text-xs text-muted">
                  Requested date: <span className="font-num font-semibold text-ink">{selectedDate}</span>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-pill bg-primary hover:bg-primary-active text-on-primary font-semibold text-sm py-3 transition-colors"
                >
                  Send Booking Request
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      </div>

      <Footer />
    </div>
  )
}
