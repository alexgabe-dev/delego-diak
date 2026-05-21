const stats = [
  { value: 5000, suffix: '+', label: 'Aktív diák' },
  { value: 300, suffix: '+', label: 'Elérhető munka' },
  { value: 120, suffix: '', label: 'Partner cég' },
  { value: 98, suffix: '%', label: 'Elégedettség' },
]

export function StatsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-lg bg-gradient-to-r from-primary to-cta p-8 shadow-2xl shadow-primary/15 lg:p-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mb-2 text-4xl font-extrabold text-primary-foreground lg:text-5xl">
                  {stat.value.toLocaleString('hu-HU')}
                  {stat.suffix}
                </div>
                <div className="text-lg font-medium text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
