import Link from 'next/link'
import { ArrowRight, Handshake, Repeat2, Search, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  {
    icon: Repeat2,
    title: 'Munkaerő-kölcsönzés',
    description: 'Rugalmas létszám a szezonális csúcsokra – mi foglalkoztatunk, ön irányítja a munkát.',
  },
  {
    icon: Search,
    title: 'Munkaerő-közvetítés',
    description: 'Kiválasztjuk és bemutatjuk a megfelelő jelölteket közvetlen, saját állományba vételre.',
  },
  {
    icon: Handshake,
    title: 'Toborzás és kiválasztás',
    description: 'Szakmunkás és tömeges toborzási projektek teljes körű lebonyolítása, országosan.',
  },
]

const points = [
  'Munkaerő akár 48 órán belül',
  'Teljes HR-adminisztráció és bérszámfejtés',
  'Dedikált kapcsolattartó a helyszínen',
  'Átlátható, előre rögzített díjazás',
]

export function ForCompaniesSection() {
  return (
    <section id="cegeknek" className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:px-8">
        <div className="relative">
          <div
            className="aspect-[4/3] w-full rounded-lg bg-cover bg-center shadow-2xl shadow-zinc-950/15"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=900&fit=crop&q=85')",
            }}
          />
          <div className="absolute -bottom-6 right-4 rounded-lg bg-primary p-5 text-primary-foreground shadow-xl shadow-primary/30 sm:right-8 lg:-right-6">
            <p className="text-3xl font-extrabold">150+</p>
            <p className="text-sm font-medium text-white/85">elégedett partnercég</p>
          </div>
        </div>

        <div className="pt-6 lg:pt-0">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">Cégeknek</p>
          <h2 className="mb-4 text-3xl font-extrabold text-foreground lg:text-5xl text-balance">
            A megfelelő emberek, a megfelelő időben.
          </h2>
          <p className="mb-8 text-lg text-muted-foreground text-pretty">
            Gyártás, logisztika, szakmunka vagy szállítás – a teljes munkaerő-folyamatot átvállaljuk,
            hogy ön a termelésre koncentrálhasson.
          </p>

          <div className="mb-8 space-y-4">
            {services.map((service) => (
              <div key={service.title} className="flex gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                  <service.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <ul className="mb-8 grid gap-2 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>

          <Link href="/ajanlatkeres">
            <Button size="lg" className="group h-12 bg-primary px-7 font-bold text-primary-foreground hover:bg-cta">
              Ajánlatot kérek
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
