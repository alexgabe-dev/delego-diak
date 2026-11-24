import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  Heart,
  Share2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { JobCard } from '@/components/job-card'
import { getRelatedJobs, jobs } from '@/lib/jobs'

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const job = jobs[id]

  if (!job) {
    notFound()
  }

  const relatedJobs = getRelatedJobs(job.id)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pb-28 lg:pb-20">
        <section className="relative min-h-[340px] overflow-hidden bg-zinc-950 pt-16 text-white sm:min-h-[440px] sm:pt-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${job.headerImage})` }}
          />
          <div className="absolute inset-0 bg-zinc-950/55" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,20,0.92)_0%,rgba(18,18,20,0.72)_45%,rgba(18,18,20,0.2)_100%)]" />
          <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-primary lg:w-2" />

          <div className="relative mx-auto flex min-h-[276px] max-w-7xl flex-col justify-end px-4 pb-8 pt-8 sm:min-h-[350px] sm:justify-center sm:py-10 lg:px-8">
            <Link
              href="/#jobs"
              className="mb-5 inline-flex w-fit sm:mb-8 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white/85 backdrop-blur-md transition-colors hover:bg-white/15 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Vissza az állásokhoz
            </Link>

            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap gap-2">
                {job.isNew && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-white px-3 py-1 text-sm font-bold text-primary">
                    <Sparkles className="h-4 w-4" />
                    Új állás
                  </span>
                )}
                {job.isFeatured && (
                  <span className="rounded-md bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                    Kiemelt állás
                  </span>
                )}
              </div>

              <h1 className="text-[2rem] font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl text-balance">
                {job.title}
              </h1>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-10 lg:grid-cols-[1fr_360px] lg:px-8 lg:pt-14">
          <div className="space-y-6">
            <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8">
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground">
                  <Briefcase className="h-4 w-4 text-primary" />
                  {job.category}
                </span>
                <span className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  Kezdés: {job.startDate}
                </span>
                <span className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  {job.schedule}
                </span>
              </div>

              <h2 className="mb-3 text-2xl font-extrabold text-foreground">A pozícióról</h2>
              <p className="leading-8 text-muted-foreground">{job.description}</p>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <h2 className="mb-5 text-xl font-extrabold text-foreground">Feladatok</h2>
                <ul className="space-y-4">
                  {job.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <h2 className="mb-5 text-xl font-extrabold text-foreground">Elvárások</h2>
                <ul className="space-y-4">
                  {job.requirements.map((requirement) => (
                    <li key={requirement} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:p-8">
              <h2 className="mb-5 text-2xl font-extrabold text-foreground">Amit kínálunk</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {job.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 rounded-md bg-secondary/70 p-4">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                    <span className="font-semibold text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-fit">
            <div className="rounded-lg border border-border bg-card p-6 shadow-xl shadow-zinc-950/5">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Havi bér</p>
                  <p className="whitespace-nowrap text-xl font-extrabold text-primary">{job.salary}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Munka mentése">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Megosztás">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <Link href={`/munka/${job.id}/jelentkezes`}>
                <Button size="lg" className="h-12 w-full bg-primary text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-cta">
                  Jelentkezem
                </Button>
              </Link>

              <div className="mt-6 space-y-4 border-t border-border pt-6">
                {[
                  ['Partner', job.company],
                  ['Helyszín', job.location],
                  ['Beosztás', job.schedule],
                  ['Feladva', new Date(job.postedDate).toLocaleDateString('hu-HU')],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="text-right text-sm font-bold text-foreground">{value}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 rounded-md bg-primary/8 p-3 text-center text-sm font-semibold text-primary">
                Kollégáink <strong>a lehető legrövidebb</strong> időn belül felkeresik!
              </p>
            </div>
          </aside>
        </div>

        <section className="mx-auto max-w-7xl px-4 pt-16 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground lg:text-3xl">Hasonló állások</h2>
              <p className="mt-1 text-muted-foreground">További nyitott pozíciók partnereinknél.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {relatedJobs.map((relatedJob) => (
              <JobCard key={relatedJob.id} job={relatedJob} />
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-2xl backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-muted-foreground">Havi bér</p>
            <p className="truncate text-base font-extrabold text-primary sm:text-lg">{job.salary}</p>
          </div>
          <Link href={`/munka/${job.id}/jelentkezes`}>
            <Button size="lg" className="shrink-0 bg-primary px-5 font-bold text-primary-foreground hover:bg-cta">
              Jelentkezem
            </Button>
          </Link>
        </div>
      </div>

      <div className="pb-24 lg:pb-0">
        <Footer />
      </div>
    </div>
  )
}
