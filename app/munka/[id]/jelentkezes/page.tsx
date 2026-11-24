'use client'

import { useParams } from 'next/navigation'
import { ApplicationPage } from '@/components/application-form'
import { jobs } from '@/lib/jobs'

export default function JobApplicationPage() {
  const params = useParams<{ id: string }>()
  return <ApplicationPage job={jobs[params.id]} />
}
