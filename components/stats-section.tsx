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
        {/* Háttérkép, hogy az üveghatás látszódjon */}
        <div className="relative overflow-hidden rounded-3xl p-4 sm:p-8 lg:p-12">
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur-[2px]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=700&fit=crop&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-zinc-900/45" />
          <div className="absolute -left-10 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-primary/50 blur-3xl" />

          <div className="relative rounded-2xl border border-white/50 bg-white/55 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl lg:p-10 dark:border-white/10 dark:bg-zinc-900/55">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center lg:border-l lg:border-zinc-900/10 lg:first:border-l-0 dark:lg:border-white/10"
                >
                  <div className="mb-2 text-4xl font-extrabold text-zinc-900 lg:text-5xl dark:text-white">
                    {stat.value.toLocaleString('hu-HU')}
                    <span className="text-primary">{stat.suffix}</span>
                  </div>
                  <div className="text-lg font-semibold text-zinc-700 dark:text-white/75">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
