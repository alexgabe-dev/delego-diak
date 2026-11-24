import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JobCard } from '@/components/job-card'
import { featuredJobs } from '@/lib/jobs'

export function FeaturedJobsSection() {
  return (
    <section id="jobs" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="mb-2 text-3xl font-extrabold text-foreground lg:text-5xl text-balance">
              Kiemelt állásaink
            </h2>
            <p className="text-lg text-muted-foreground">
              Bejelentett, hosszú távú pozíciók ellenőrzött partnercégeinknél.
            </p>
          </div>
          <Link href="/munkak">
            <Button variant="outline" className="group border-2 border-primary font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
              Összes állás
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        {/* Jobs grid - 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        {/* Load more on mobile */}
        <div className="mt-10 text-center lg:hidden">
          <Link href="/munkak">
            <Button size="lg" className="w-full bg-primary font-semibold text-primary-foreground hover:bg-cta sm:w-auto">
              További állások
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
