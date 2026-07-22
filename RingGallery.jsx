import { useState } from 'react'
import { useImageStore } from './ImageStore.jsx'

const ringItems = [
  { id: 'weddings', label: 'Luxury Weddings', tint: '#2b3139', icon: 'rings' },
  { id: 'corporate', label: 'Corporate Summits', tint: '#1e2329', icon: 'podium' },
  { id: 'dinners', label: 'Private Dinners', tint: '#2b3139', icon: 'candle' },
  { id: 'fashion', label: 'Fashion Shows', tint: '#1e2329', icon: 'runway' },
  { id: 'birthdays', label: 'Milestone Birthdays', tint: '#2b3139', icon: 'balloon' },
  { id: 'launches', label: 'Brand Launches', tint: '#1e2329', icon: 'spark' },
]

const icons = {
  rings: (
    <svg viewBox="0 0 40 40" width="30" height="30" fill="none" stroke="#FCD535" strokeWidth="2">
      <circle cx="15" cy="22" r="9" />
      <circle cx="25" cy="22" r="9" />
    </svg>
  ),
  podium: (
    <svg viewBox="0 0 40 40" width="30" height="30" fill="none" stroke="#FCD535" strokeWidth="2">
      <path d="M8 30h24M14 30V16h12v14M18 16V9h4v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  candle: (
    <svg viewBox="0 0 40 40" width="30" height="30" fill="none" stroke="#FCD535" strokeWidth="2">
      <path d="M20 12v20M12 32h16M20 12c-2-2-2-5 0-7 2 2 2 5 0 7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  runway: (
    <svg viewBox="0 0 40 40" width="30" height="30" fill="none" stroke="#FCD535" strokeWidth="2">
      <path d="M20 8v24M13 8l7 24 7-24" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  balloon: (
    <svg viewBox="0 0 40 40" width="30" height="30" fill="none" stroke="#FCD535" strokeWidth="2">
      <ellipse cx="20" cy="16" rx="8" ry="10" />
      <path d="M20 26v8" strokeLinecap="round" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 40 40" width="30" height="30" fill="none" stroke="#FCD535" strokeWidth="2">
      <path d="M20 8v8M20 24v8M8 20h8M24 20h8" strokeLinecap="round" />
    </svg>
  ),
}

export default function RingGallery() {
  const [paused, setPaused] = useState(false)
  const { images } = useImageStore()
  const n = ringItems.length

  return (
    <div
      className="ring-stage select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`ring-track ${paused ? 'paused' : ''}`}>
        {ringItems.map((item, i) => {
          const angle = (360 / n) * i
          return (
            <div
              key={item.id}
              className="ring-card"
              style={{
                transform: `rotate(${angle}deg) translate(var(--ring-radius, 230px)) rotate(-${angle}deg)`,
              }}
            >
              <div
                className="counter-rotate relative flex flex-col items-center justify-center gap-2 px-2 text-center overflow-hidden"
                style={{ background: item.tint }}
              >
                {images[`category:${item.id}`] ? (
                  <>
                    <img
                      src={images[`category:${item.id}`]}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <span className="absolute inset-0 bg-canvas-dark/40" />
                    <span className="relative text-[11px] font-semibold text-white leading-tight drop-shadow">
                      {item.label}
                    </span>
                  </>
                ) : (
                  <>
                    {icons[item.icon]}
                    <span className="text-[11px] font-semibold text-body leading-tight">
                      {item.label}
                    </span>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[62%] aspect-square rounded-full bg-canvas-dark border border-hairline-on-dark flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-display font-extrabold text-primary leading-[1.1] text-[28px] md:text-[36px]">
            We curate unforgettable events.
          </h1>
          <p className="mt-3 text-muted text-xs md:text-sm max-w-[240px]">
            Connect with top-tier local event planners and visionary stylists.
          </p>
        </div>
      </div>
    </div>
  )
}
