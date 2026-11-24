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
        <div className="relative overflow-hidden rounded-2xl bg-zinc-200/60 p-8 shadow-xl shadow-zinc-950/5 ring-1 ring-white/60 backdrop-blur-xl lg:p-12 dark:bg-white/5 dark:ring-white/10">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/70 blur-3xl dark:bg-white/5" />
          <div className="pointer-events-none absolute -bottom-20 right-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="relative text-center lg:border-l lg:border-zinc-400/30 lg:first:border-l-0 dark:lg:border-white/10">
                <div className="mb-2 text-4xl font-extrabold text-foreground lg:text-5xl">
                  {stat.value.toLocaleString('hu-HU')}
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                <div className="text-lg font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
