import type { Metadata } from 'next'
import { Suspense } from 'react'
import ErrorBoundary from '@/components/ui/error-boundary'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import GalleryAlbumsSection from './gallery-albums-section'
import { GalleryGridSkeleton } from './gallery-grid-skeleton'

export const metadata: Metadata = {
  title: 'gallery - miiyuh.com',
  description: 'from the pens and lenses of mine, through out the years. a curated collection of my photography and artwork by miiyuh.',
}

// ISR: Revalidate every 5 minutes with collection hooks forcing faster updates on save
export const revalidate = 300

export default function GalleryPage() {
  return (
    <ErrorBoundary>
      <div className="bg-bg-primary text-text-primary font-sans min-h-screen flex flex-col relative">
        <main className="relative grow px-8 md:px-32 lg:px-56 xl:px-80 pt-6 pb-16">
          <div>
            {/* Breadcrumb Navigation */}
            <SimpleBreadcrumb items={breadcrumbs.gallery()} className="-mx-8 px-8 md:mx-0 md:px-0" />

            {/* Header */}
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-5xl md:text-6xl font-notch tracking-tight mb-4 text-text-primary text-balance">
                gallery
              </h1>
              <p className="text-lg md:text-xl text-text-secondary text-pretty">
                from the pens and lenses of mine, through out the years. a
                curated collection of my photography and artwork.
              </p>
            </div>

            {/* Albums Grid - borders act as grid lines */}
            <Suspense fallback={<GalleryGridSkeleton />}>
              <GalleryAlbumsSection />
            </Suspense>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}
