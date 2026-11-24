'use client'

import Link from 'next/link'
import { ArrowRight, MapPin, Banknote, Tag } from 'lucide-react'

export interface Job {
  id: string
  title: string
  location: string
  salary: string
  category: string
  workType: string
  coverImage?: string
  isNew?: boolean
  isFeatured?: boolean
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/munka/${job.id}`} className="group block h-full">
      <article className="relative flex h-full flex-row overflow-hidden rounded-xl border border-border bg-card sm:flex-col sm:rounded-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
        {/* Cover Image */}
        <div className="relative w-28 shrink-0 overflow-hidden bg-secondary sm:aspect-[16/10] sm:w-full">
          {job.coverImage ? (
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${job.coverImage})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary to-secondary" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col items-start gap-1 sm:left-3 sm:top-3 sm:flex-row sm:gap-2">
            {job.isNew && (
              <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-primary shadow-lg sm:px-2.5 sm:py-1 sm:text-xs">
                Új
              </span>
            )}
            {job.isFeatured && (
              <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-lg sm:px-2.5 sm:py-1 sm:text-xs">
                Kiemelt
              </span>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-[15px] font-bold sm:mb-3 sm:text-base leading-snug text-foreground transition-colors group-hover:text-primary lg:text-lg">
            {job.title}
          </h3>
          
          {/* Details */}
          <div className="mt-auto flex flex-col gap-1 sm:gap-2">
            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-primary/70" />
              <span className="truncate">{job.location}</span>
            </div>
            
            {/* Salary */}
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Banknote className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">{job.salary}</span>
            </div>
            
            {/* Category tag */}
            <div className="mt-1 hidden sm:block">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                <Tag className="h-3 w-3" />
                {job.category}
              </span>
            </div>

            <div className="mt-4 hidden items-center justify-between border-t border-border pt-3 text-sm font-bold text-primary sm:flex">
              <span>Részletek</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
