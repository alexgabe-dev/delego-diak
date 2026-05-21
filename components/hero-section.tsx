import Link from 'next/link'
import { CheckCircle2, MapPin, Sparkles, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-slate-950 pt-28 text-white lg:min-h-[760px] lg:pt-32">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&h=1100&fit=crop&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-slate-950/55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0.72)_42%,rgba(15,23,42,0.28)_100%)]" />

      <div className="relative mx-auto flex min-h-[580px] max-w-7xl flex-col justify-center px-4 pb-28 lg:px-8 lg:pb-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/12 px-3 py-2 text-sm font-semibold backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-accent" />
            300+ aktív diákmunka, heti fizetéssel
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[0.98] text-white md:text-6xl lg:text-7xl text-balance">
            Találd meg a munkát, ami passzol az órarendedhez.
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-8 text-white/82 md:text-xl text-pretty">
            Rugalmas diákmunkák ellenőrzött partnereknél, gyors jelentkezéssel és átlátható bérekkel.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="#jobs">
              <Button
                size="lg"
                className="h-12 w-full bg-primary px-7 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-cta sm:w-auto"
              >
                Munkák böngészése
              </Button>
            </Link>
            <Link href="/regisztracio">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full border-white/70 bg-white/10 px-7 text-base font-bold text-white backdrop-blur-md hover:bg-white hover:text-slate-950 sm:w-auto"
              >
                Csatlakozz most
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/15 bg-white/12 p-4 backdrop-blur-md">
              <Wallet className="mb-3 h-5 w-5 text-accent" />
              <p className="text-2xl font-extrabold">2 500 Ft</p>
              <p className="text-sm text-white/70">akár óránként</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/12 p-4 backdrop-blur-md">
              <MapPin className="mb-3 h-5 w-5 text-accent" />
              <p className="text-2xl font-extrabold">6 város</p>
              <p className="text-sm text-white/70">friss lehetőségekkel</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/12 p-4 backdrop-blur-md">
              <CheckCircle2 className="mb-3 h-5 w-5 text-accent" />
              <p className="text-2xl font-extrabold">2 perc</p>
              <p className="text-sm text-white/70">gyors jelentkezés</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
