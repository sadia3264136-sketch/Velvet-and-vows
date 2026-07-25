const stats = [
  { value: '1,250+', label: 'Successful Events' },
  { value: '45+', label: 'Elite Local Planners' },
  { value: '100%', label: 'Client Satisfaction' },
]

export default function StatsBand() {
  return (
    <section className="bg-surface-card-dark border-y border-hairline-on-dark">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-num text-primary text-3xl md:text-4xl font-bold">{s.value}</div>
            <div className="mt-2 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
