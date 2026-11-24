import Link from 'next/link'
import { ArrowRight, BadgeCheck, Database, HardHat, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-zinc-950 pt-28 text-white lg:min-h-[780px] lg:pt-32">
      {/* Borítókép: mobilon teljes háttér, asztali nézetben a jobb oldalon, hogy az arc ne kerüljön a szöveg alá */}
      <div
        className="absolute inset-0 bg-cover bg-[position:62%_center] lg:left-[38%]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1725811641350-f63dc7442725?w=1800&h=1200&fit=crop&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-zinc-950/65 lg:hidden" />
      <div className="absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,rgba(18,18,20,1)_0%,rgba(18,18,20,1)_38%,rgba(18,18,20,0.55)_52%,rgba(18,18,20,0.05)_75%,rgba(18,18,20,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950/70 to-transparent" />
      {/* Piros arculati sáv */}
      <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-primary lg:w-2" />

      <div className="relative mx-auto flex min-h-[580px] max-w-7xl flex-col justify-center px-4 pb-28 lg:px-8 lg:pb-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30">
            <BadgeCheck className="h-4 w-4" />
            Engedélyezett munkaerő-kölcsönző és -közvetítő
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.02] text-white md:text-6xl lg:text-7xl text-balance">
            Stabil munka. <span className="text-primary">Megbízható</span> csapat.
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-8 text-white/80 md:text-xl text-pretty">
            Bejelentett, hosszú távú állások szakmunkásoknak és betanított munkatársaknak – és
            gyorsan elérhető, ellenőrzött munkaerő partnercégeinknek.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="#jobs">
              <Button
                size="lg"
                className="h-12 w-full bg-primary px-7 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-cta sm:w-auto"
              >
                <HardHat className="mr-1 h-5 w-5" />
                Munkát keresek
              </Button>
            </Link>
            <Link href="/jelentkezes">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full border-white/70 bg-white/10 px-7 text-base font-bold text-white backdrop-blur-md hover:bg-white hover:text-zinc-950 sm:w-auto"
              >
                <Database className="mr-1 h-5 w-5" />
                Adatbázisba jelentkezem
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 border-l-primary border-l-4 bg-white/10 p-4 backdrop-blur-md">
              <p className="text-2xl font-extrabold">1 200+</p>
              <p className="text-sm text-white/70">nyitott pozíció</p>
            </div>
            <div className="rounded-lg border border-white/10 border-l-primary border-l-4 bg-white/10 p-4 backdrop-blur-md">
              <p className="flex items-center gap-1.5 text-2xl font-extrabold">
                <MapPin className="h-5 w-5 text-primary" />
                19 megye
              </p>
              <p className="text-sm text-white/70">országos lefedettség</p>
            </div>
            <div className="rounded-lg border border-white/10 border-l-primary border-l-4 bg-white/10 p-4 backdrop-blur-md">
              <p className="text-2xl font-extrabold">48 óra</p>
              <p className="text-sm text-white/70">alatt munkaerő a cégeknek</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
