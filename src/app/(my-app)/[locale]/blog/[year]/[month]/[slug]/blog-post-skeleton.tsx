import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import { Separator } from '@/components/ui/separator'
import { ImageSkeleton, TextSkeleton, MetaInfoSkeleton } from '@/components/ui/skeleton'
import { Fragment } from 'react'

export function BlogPostSkeleton() {
  return (
    <Fragment>
      <main className="relative min-h-screen text-text-primary">
        <div className="relative z-10 mx-auto max-w-4xl px-8 md:px-16 lg:px-8 pt-6 pb-16">
          {/* Breadcrumbs Skeleton */}
          <SimpleBreadcrumb
            items={breadcrumbs.blogPost('year', 'month', 'post')}
            className="-mx-8 px-8 md:-mx-16 md:px-16 lg:mx-0 lg:px-0"
            staticFrom="lg"
          />

          {/* Cover Image Skeleton */}
          <div className="mb-8">
            <ImageSkeleton />
          </div>

          {/* Post Header */}
          <header className="mb-8 space-y-4">
            {/* Title Skeleton */}
            <TextSkeleton lines={2} />

            {/* Meta Info Skeleton */}
            <MetaInfoSkeleton />

            {/* Excerpt Skeleton */}
            <TextSkeleton lines={2} className="pt-2" />
          </header>

          {/* Separator */}
          <Separator className="my-8 bg-white/10" />

          {/* Content Skeleton */}
          <TextSkeleton lines={8} className="mb-12 space-y-4" />

          {/* Back to Blog Link Skeleton */}
          <footer className="mt-12 border-t border-text-primary/10 pt-8">
            <div className="h-5 bg-white/5 rounded-lg animate-pulse w-32" />
          </footer>
        </div>
      </main>
    </Fragment>
  )
}
