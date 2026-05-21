import { Zap, Calendar, Wallet, Shield } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Gyors jelentkezés',
    description: 'Néhány kattintással jelentkezhetsz a számodra megfelelő munkára.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Calendar,
    title: 'Rugalmas munkák',
    description: 'Dolgozz amikor neked megfelel, alkalmazkodj a saját időbeosztásodhoz.',
    color: 'bg-accent/30 text-accent-foreground',
  },
  {
    icon: Wallet,
    title: 'Heti fizetés',
    description: 'Ne várj a pénzedre, minden héten megkapod a munkabéredet.',
    color: 'bg-beige text-beige-foreground',
  },
  {
    icon: Shield,
    title: 'Megbízható partnerek',
    description: 'Csak ellenőrzött, megbízható cégekkel dolgozunk együtt.',
    color: 'bg-secondary text-primary',
  },
]

export function WhyDelegoSection() {
  return (
    <section id="about" className="bg-secondary/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-foreground lg:text-5xl text-balance">
            Miért a Delego?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Több mint 10 éve segítjük a diákokat, hogy megtalálják a számukra ideális munkát.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="group rounded-lg border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg ${feature.color}`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
