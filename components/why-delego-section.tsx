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
    <section id="about" className="bg-secondary/60 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 grid gap-4 sm:mb-12 sm:gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">Munkavállalóknak</p>
            <h2 className="text-[1.75rem] font-extrabold sm:text-3xl text-foreground lg:text-5xl text-balance">
              Miért dolgozz velünk?
            </h2>
          </div>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg text-pretty lg:justify-self-end">
            Több mint 20 éve segítünk embereknek stabil, jól fizető munkát találni – és a munkába
            állás után is melletted maradunk.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all sm:block sm:rounded-lg sm:p-6 duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-zinc-950/5"
            >
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg sm:mb-5 sm:h-12 sm:w-12 bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="mb-1 text-base font-bold text-foreground sm:mb-2 sm:text-xl">{feature.title}</h3>
                <p className="text-sm text-muted-foreground sm:text-base">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
