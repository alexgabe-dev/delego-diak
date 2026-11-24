'use client'

import { use, useMemo, useState } from 'react'
import { Briefcase, MapPin, Search, SlidersHorizontal, X } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { JobCard } from '@/components/job-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { featuredJobs } from '@/lib/jobs'

const cities = Array.from(new Set(featuredJobs.map((job) => job.location)))
const categories = Array.from(new Set(featuredJobs.map((job) => job.category)))
const workTypes = Array.from(new Set(featuredJobs.map((job) => job.workType)))

type JobsSearchParams = {
  q?: string
  city?: string
  category?: string
  type?: string
}

export default function JobsPage({
  searchParams,
}: {
  searchParams: Promise<JobsSearchParams>
}) {
  const resolvedSearchParams = use(searchParams)
  const [query, setQuery] = useState(resolvedSearchParams.q ?? '')
  const [city, setCity] = useState(resolvedSearchParams.city ?? '')
  const [category, setCategory] = useState(resolvedSearchParams.category ?? '')
  const [workType, setWorkType] = useState(resolvedSearchParams.type ?? '')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return featuredJobs.filter((job) => {
      const matchesQuery =
        !normalizedQuery ||
        [job.title, job.location, job.category, job.workType]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      return (
        matchesQuery &&
        (!city || job.location === city) &&
        (!category || job.category === category) &&
        (!workType || job.workType === workType)
      )
    })
  }, [category, city, query, workType])

  const hasFilters = query || city || category || workType

  const clearFilters = () => {
    setQuery('')
    setCity('')
    setCategory('')
    setWorkType('')
  }

  return (
    <div className="min-h-screen bg-zinc-200/70 dark:bg-background">
      <Navbar />

      <main className="pt-24">
        <section className="relative overflow-hidden bg-zinc-950 px-4 py-16 text-white lg:px-8 lg:py-20">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1624927637280-f033784c1279?w=1800&h=800&fit=crop&q=85')",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,20,0.96)_0%,rgba(18,18,20,0.78)_55%,rgba(18,18,20,0.42)_100%)]" />
          <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-primary lg:w-2" />

          <div className="relative mx-auto max-w-7xl">
            <p className="mb-3 inline-flex rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">
              Összes állás
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl text-balance">
              Találd meg a következő stabil munkahelyed.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
              Böngéssz a friss állások között, szűrj városra, szakterületre vagy munkarendre.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 lg:px-8">
          <div className="rounded-lg border border-border/70 bg-card/95 p-4 shadow-2xl shadow-zinc-950/10 backdrop-blur-md lg:p-5">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Munkakör, város..."
                  className="h-12 rounded-md border-2 border-transparent bg-secondary pl-12 text-base focus:border-primary focus:bg-card"
                />
              </div>

              <div className="hidden gap-3 lg:flex">
                <FilterSelect value={city} onChange={setCity} options={cities} placeholder="Minden város" />
                <FilterSelect value={category} onChange={setCategory} options={categories} placeholder="Minden kategória" />
                <FilterSelect value={workType} onChange={setWorkType} options={workTypes} placeholder="Minden típus" />
              </div>

              <Button
                type="button"
                onClick={() => setShowMobileFilters((value) => !value)}
                variant="outline"
                className="h-12 border-2 font-bold text-primary lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Szűrők
              </Button>
            </div>

            {showMobileFilters && (
              <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2 lg:hidden">
                <FilterSelect value={city} onChange={setCity} options={cities} placeholder="Minden város" />
                <FilterSelect value={category} onChange={setCategory} options={categories} placeholder="Minden kategória" />
              </div>
            )}

            {hasFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                <span className="text-sm font-semibold text-muted-foreground">Aktív szűrők:</span>
                {query && <FilterChip label={query} onClear={() => setQuery('')} />}
                {city && <FilterChip label={city} onClear={() => setCity('')} />}
                {category && <FilterChip label={category} onClear={() => setCategory('')} />}
                {workType && <FilterChip label={workType} onClear={() => setWorkType('')} />}
                <button onClick={clearFilters} className="text-sm font-bold text-muted-foreground hover:text-foreground">
                  Összes törlése
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-16">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground lg:text-4xl">
                {filteredJobs.length} elérhető állás
              </h2>
              <p className="mt-2 text-muted-foreground">
                Bejelentett, hosszú távú pozíciók ellenőrzött partnereinknél.
              </p>
            </div>
            <div className="flex gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 font-semibold">
                <MapPin className="h-4 w-4 text-primary" />
                {cities.length} város
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 font-semibold">
                <Briefcase className="h-4 w-4 text-primary" />
                {categories.length} szakterület
              </span>
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card p-10 text-center">
              <h3 className="text-2xl font-extrabold text-foreground">Nincs találat</h3>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                Próbálj kevesebb szűrőt használni, vagy töröld az aktív szűrőket.
              </p>
              <Button onClick={clearFilters} className="mt-6 bg-primary font-bold text-primary-foreground hover:bg-cta">
                Szűrők törlése
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 min-w-44 rounded-md border-2 border-transparent bg-secondary px-4 text-sm font-bold text-foreground transition-colors focus:border-primary focus:bg-card focus:outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
      {label}
      <button onClick={onClear} aria-label={`${label} szűrő törlése`}>
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}
