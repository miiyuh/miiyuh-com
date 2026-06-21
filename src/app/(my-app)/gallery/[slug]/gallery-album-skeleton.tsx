import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import { ImageSkeleton, TextSkeleton } from '@/components/ui/skeleton'
import { Fragment } from 'react'

export function GalleryAlbumSkeleton() {
  return (
    <Fragment>
      <div className="bg-bg-primary text-text-primary font-sans min-h-screen flex flex-col relative">
        <main className="relative grow px-8 md:px-32 lg:px-56 xl:px-80 py-24" style={{ paddingTop: '24px' }}>
        <div>
          {/* Breadcrumb Navigation */}
          <SimpleBreadcrumb items={breadcrumbs.galleryAlbum('album')} />
          

          {/* Header */}
          <div className="mb-16 max-w-4xl">
            <TextSkeleton lines={1} className="mb-4 w-16" />
            <TextSkeleton lines={2} />
          </div>

          {/* Gallery Grid Skeleton */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <ImageSkeleton className="aspect-square" />
                  <TextSkeleton lines={1} />
                </div>
              ))}
            </div>
          </div>
        </div>
        </main>
      </div>
    </Fragment>
  )
}
