import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import SurveysSection from './surveys-section'
import { SurveysListSkeleton } from './surveys-list-skeleton'

export const metadata: Metadata = {
  title: 'surveys - miiyuh.com',
  description: 'quick polls and feedback forms. share your thoughts on various topics and help shape future content.',
  alternates: {
    canonical: 'https://miiyuh.com/surveys',
  },
}

export const revalidate = 60 // Revalidate every minute

export default function SurveysPage() {
  return (
    <main className="flex flex-col bg-bg-primary text-text-primary font-sans relative min-h-screen">
      <section className="relative grow px-8 md:px-32 lg:px-56 xl:px-80 pt-6 pb-16 min-h-[70vh]">
        <div>
          <SimpleBreadcrumb items={breadcrumbs.surveys()} className="-mx-8 px-8 md:mx-0 md:px-0" />

          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-notch tracking-tight mb-4 text-text-primary text-balance">
              surveys
            </h1>
            <p className="text-lg md:text-xl text-text-secondary text-pretty">
              help me understand what matters to you. take a quick survey and share your feedback.
            </p>
          </div>

          <Suspense fallback={<SurveysListSkeleton />}>
            <SurveysSection />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
