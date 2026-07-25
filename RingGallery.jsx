import { useState } from 'react'
import { useImageStore } from './ImageStore.jsx'
import { categoryImages } from './images.js'

const ringItems = [
  { id: 'weddings', label: 'Luxury Weddings' },
  { id: 'corporate', label: 'Corporate Summits' },
  { id: 'dinners', label: 'Private Dinners' },
  { id: 'fashion', label: 'Fashion Shows' },
  { id: 'birthdays', label: 'Milestone Birthdays' },
  { id: 'launches', label: 'Brand Launches' },
]

export default function RingGallery() {
  const [paused, setPaused] = useState(false)
  const { images } = useImageStore()
  const n = ringItems.length

  return (
    <div
      className="ring-stage select-none animate-fade-up-delay"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft flat accent disc behind the ring — gives the hero depth without gradients */}
      <div className="absolute inset-[6%] rounded-full bg-surface-card-dark border border-hairline-on-dark" />

      <div className={`ring-track ${paused ? 'paused' : ''}`}>
        {ringItems.map((item, i) => {
          const angle = (360 / n) * i
          const photo = images[`category:${item.id}`] || categoryImages[item.id]
          return (
            <div
              key={item.id}
              className="ring-card"
              style={{
                transform: `rotate(${angle}deg) translate(var(--ring-radius, 230px)) rotate(-${angle}deg)`,
              }}
            >
              <div className="counter-rotate relative overflow-hidden">
                <img src={photo} alt={item.label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <span className="absolute inset-0 bg-gradient-to-t from-canvas-dark/85 via-canvas-dark/10 to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 text-[11px] font-semibold text-white leading-tight drop-shadow">
                  {item.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60%] aspect-square rounded-full bg-canvas-dark border border-primary/40 flex flex-col items-center justify-center text-center px-6">
          <span className="rounded-pill bg-surface-elevated-dark text-primary text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-3">
            Est. Curators
          </span>
          <p className="font-display font-extrabold text-primary leading-[1.1] text-[26px] md:text-[34px]">
            We curate unforgettable events.
          </p>
          <p className="mt-3 text-muted text-xs md:text-sm max-w-[240px]">
            Connect with top-tier local event planners and visionary stylists.
          </p>
        </div>
      </div>
    </div>
  )
}
