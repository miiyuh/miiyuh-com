import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import ProjectsSection from './projects-section'
import { ProjectsListSkeleton } from './projects-list-skeleton'

export const metadata: Metadata = {
  title: 'projects - miiyuh.com',
  description: 'side projects, university work, and research papers — the collection by miiyuh.',
  alternates: {
    canonical: 'https://miiyuh.com/projects',
  },
}

// ISR: Revalidate every 60 seconds for faster repeat visits
export const revalidate = 60

export default function ProjectsPage() {
  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen">
      <section className="relative grow pt-6 pb-16">
        <div className="px-8 md:px-32 lg:px-56 xl:px-80">
          {/* Breadcrumb + heading */}
          <SimpleBreadcrumb items={breadcrumbs.projects()} className="-mx-8 px-8 md:mx-0 md:px-0" />

          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-notch tracking-tight mb-4 text-text-primary text-balance">
              projects
            </h1>
            <p className="text-lg md:text-xl text-text-secondary text-pretty max-w-prose">
              side projects, university work, and research papers — the
              collection
            </p>
          </div>

          <Suspense fallback={<ProjectsListSkeleton />}>
            <ProjectsSection />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
