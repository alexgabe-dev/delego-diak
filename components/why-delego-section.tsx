import { FileCheck2, Home, Bus, UserRound } from 'lucide-react'

const features = [
  {
    icon: FileCheck2,
    title: 'Bejelentett munkaviszony',
    description: 'Minden munkavállalónk teljes jogú, bejelentett szerződéssel, pontos bérfizetéssel dolgozik.',
  },
  {
    icon: Home,
    title: 'Szállás és utazás',
    description: 'Vidékről érkezőknek szállást, a munkahelyekre céges buszjáratot vagy bérlettámogatást biztosítunk.',
  },
  {
    icon: Bus,
    title: 'Hosszú távú állások',
    description: 'Stabil partnereinknél kiszámítható műszakrend és valós lehetőség a közvetlen átvételre.',
  },
  {
    icon: UserRound,
    title: 'Személyes kapcsolattartó',
    description: 'Az első naptól saját koordinátor segít a beilleszkedésben, a papírmunkában és bármilyen kérdésben.',
  },
]

export function WhyDelegoSection() {
  return (
    <section id="about" className="bg-secondary/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">Munkavállalóknak</p>
            <h2 className="text-3xl font-extrabold text-foreground lg:text-5xl text-balance">
              Miért dolgozz velünk?
            </h2>
          </div>
          <p className="max-w-xl text-lg text-muted-foreground text-pretty lg:justify-self-end">
            Több mint 20 éve segítünk embereknek stabil, jól fizető munkát találni – és a munkába
            állás után is melletted maradunk.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-zinc-950/5"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
