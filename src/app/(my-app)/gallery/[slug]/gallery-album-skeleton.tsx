'use client'

import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { ImageSkeleton, TextSkeleton } from '@/components/ui/skeleton'
import { Fragment } from 'react'

export function GalleryAlbumSkeleton() {
  return (
    <Fragment>
      <main className="relative min-h-screen text-text-primary">
        <div className="px-6 md:px-12 lg:px-24 xl:px-32 py-16">
          {/* Breadcrumbs */}
          <SimpleBreadcrumb
            items={[
              { label: 'home', href: '/' },
              { label: 'gallery', href: '/gallery' },
              { label: 'album', href: '#' },
            ]}
            className="mb-8"
          />

          {/* Header */}
          <div className="mb-12 max-w-4xl">
            <TextSkeleton lines={1} className="mb-4" />
            <TextSkeleton lines={2} />
          </div>

          {/* Gallery Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <ImageSkeleton className="aspect-square" />
                <TextSkeleton lines={1} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </Fragment>
  )
}
