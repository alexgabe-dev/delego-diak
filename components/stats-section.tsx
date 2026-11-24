const stats = [
  { value: 20, suffix: '+', label: 'év tapasztalat' },
  { value: 3500, suffix: '+', label: 'kihelyezett munkavállaló' },
  { value: 150, suffix: '+', label: 'partnercég' },
  { value: 19, suffix: '', label: 'megye' },
]

export function StatsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-zinc-900 p-8 shadow-2xl shadow-zinc-950/20 lg:p-12 dark:bg-zinc-950 dark:ring-1 dark:ring-border">
          <div className="absolute left-0 top-0 h-full w-2 bg-primary" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:border-l lg:border-white/10 lg:first:border-l-0">
                <div className="mb-2 text-4xl font-extrabold text-white lg:text-5xl">
                  {stat.value.toLocaleString('hu-HU')}
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                <div className="text-lg font-medium text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
