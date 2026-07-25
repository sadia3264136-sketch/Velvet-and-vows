import { useState } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import SEO from './SEO.jsx'
import { CONTACT_EMAIL } from './planners.js'
import { bannerImages } from './images.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', eventType: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent('New Inquiry — VELVET & VOWS')
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nEvent type: ${form.eventType}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <div className="bg-canvas-dark min-h-screen">
      <SEO
        title="Contact Us"
        description="Tell us about your event and our concierge team will match you with a vetted Velvet & Vows planner within one business day."
        path="/contact"
      />
      <Navbar />

      <section className="relative h-64 md:h-80 overflow-hidden border-b border-hairline-on-dark">
        <img
          src={bannerImages.contact}
          alt="Contact us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute inset-0 bg-canvas-dark/70" />
        <div className="relative h-full mx-auto max-w-7xl px-4 md:px-6 flex flex-col justify-center">
          <span className="text-primary text-xs font-bold tracking-widest uppercase">
            Contact
          </span>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-body">
            Let's plan something unforgettable.
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <h2 className="font-display text-xl font-bold text-body">Get in touch</h2>
            <p className="mt-3 text-muted text-sm leading-relaxed">
              Tell us about your event and our concierge team will match you with the right
              planner within one business day.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <p className="text-muted">
                Email:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:text-primary-active">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-muted">Hours: Mon–Sat, 10am–7pm</p>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="rounded-xl bg-surface-card-dark border border-hairline-on-dark p-6">
              {submitted ? (
                <div className="text-sm">
                  <p className="font-semibold text-body">Your email client should now be open.</p>
                  <p className="mt-2 text-muted">
                    If it didn't launch, email us directly at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="mt-1.5 w-full rounded-md bg-surface-elevated-dark border border-hairline-on-dark text-body text-sm px-3.5 py-2.5 focus:border-primary outline-none"
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
                        className="mt-1.5 w-full rounded-md bg-surface-elevated-dark border border-hairline-on-dark text-body text-sm px-3.5 py-2.5 focus:border-primary outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted" htmlFor="eventType">
                      Event type
                    </label>
                    <input
                      id="eventType"
                      name="eventType"
                      placeholder="e.g. Wedding, Corporate Summit"
                      value={form.eventType}
                      onChange={handleChange}
                      className="mt-1.5 w-full rounded-md bg-surface-elevated-dark border border-hairline-on-dark text-body text-sm px-3.5 py-2.5 focus:border-primary outline-none"
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
                      className="mt-1.5 w-full rounded-md bg-surface-elevated-dark border border-hairline-on-dark text-body text-sm px-3.5 py-2.5 focus:border-primary outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto rounded-pill bg-primary hover:bg-primary-active text-on-primary font-semibold text-sm px-8 py-3 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
