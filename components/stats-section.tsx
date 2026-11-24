const stats = [
  { value: 20, suffix: '+', label: 'év tapasztalat' },
  { value: 3500, suffix: '+', label: 'kihelyezett munkavállaló' },
  { value: 150, suffix: '+', label: 'partnercég' },
  { value: 19, suffix: '', label: 'megye' },
]

export function StatsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-100 via-zinc-200/80 to-zinc-100 p-3 ring-1 ring-zinc-200 sm:p-6 lg:p-8 dark:from-zinc-900 dark:via-zinc-800/60 dark:to-zinc-900 dark:ring-white/10">
          {/* Finom fényfoltok, hogy az üveghatás látszódjon */}
          <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl dark:bg-primary/30" />
          <div className="pointer-events-none absolute -bottom-28 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-white blur-3xl dark:bg-white/5" />
          <div className="pointer-events-none absolute -right-16 -top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

          <div className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/80 bg-white/60 px-3 py-5 text-center sm:px-6 sm:py-8 shadow-lg shadow-zinc-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-black/20"
              >
                <div className="mb-1 text-3xl font-extrabold text-zinc-900 sm:mb-2 sm:text-4xl lg:text-5xl dark:text-white">
                  {stat.value.toLocaleString('hu-HU')}
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                <div className="text-sm font-semibold leading-snug text-zinc-600 sm:text-base lg:text-lg dark:text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
