import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import SEO from './SEO.jsx'
import { bannerImages } from './images.js'

const values = [
  {
    title: 'Vetted, not open sign-up',
    body: 'Every studio is personally reviewed for craftsmanship and reliability before they ever appear on the platform.',
  },
  {
    title: 'Transparent pricing',
    body: 'No hidden fees or vague "contact for quote" walls — every planner lists real starting prices.',
  },
  {
    title: 'Local expertise',
    body: "We work with planners who know your city's venues, vendors, and logistics inside out.",
  },
  {
    title: 'One point of contact',
    body: 'Every inquiry routes straight to our concierge team, who match you with the right studio.',
  },
]

export default function About() {
  return (
    <div className="bg-canvas-dark min-h-screen">
      <SEO
        title="About Us"
        description="Velvet & Vows personally vets every event planner, wedding stylist, and gala curator on the platform for craftsmanship, reliability, and taste."
        path="/about"
      />
      <Navbar />

      <section className="relative h-72 md:h-96 overflow-hidden border-b border-hairline-on-dark">
        <img
          src={bannerImages.about}
          alt="Elegant event setting"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute inset-0 bg-canvas-dark/70" />
        <div className="relative h-full mx-auto max-w-7xl px-4 md:px-6 flex flex-col justify-center">
          <span className="text-primary text-xs font-bold tracking-widest uppercase">
            About Velvet & Vows
          </span>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-body max-w-2xl">
            Curated access to the region's best event studios.
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <p className="text-muted text-base md:text-lg leading-relaxed">
            Velvet & Vows started with a simple frustration: the best event planners were
            impossible to find, buried behind referrals and closed circles. We built a
            platform that opens that door — without lowering the bar. Every planner on this
            site has been personally vetted for craftsmanship, reliability, and taste before
            they're allowed to take a single booking.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl bg-surface-card-dark border border-hairline-on-dark p-6"
              >
                <h3 className="font-display font-bold text-body">{v.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
