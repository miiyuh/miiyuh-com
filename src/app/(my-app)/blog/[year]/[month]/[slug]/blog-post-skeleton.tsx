'use client'

import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { Separator } from '@/components/ui/separator'
import { ImageSkeleton, TextSkeleton, MetaInfoSkeleton } from '@/components/ui/skeleton'
import { Fragment } from 'react'

export function BlogPostSkeleton() {
  return (
    <Fragment>
      <main className="relative min-h-screen text-[#FAF3E0]">
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 sm:px-6 lg:px-8 animate-smooth-slide-up">
          {/* Breadcrumbs Skeleton */}
          <SimpleBreadcrumb
            items={[
              { label: 'home', href: '/' },
              { label: 'blog', href: '/blog' },
              { label: 'year', href: '#' },
              { label: 'month', href: '#' },
              { label: 'post', href: '#' },
            ]}
            className="mb-8"
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
          <footer className="mt-12 border-t border-[#FAF3E0]/10 pt-8">
            <div className="h-5 bg-white/5 rounded-lg animate-pulse w-32" />
          </footer>
        </div>
      </main>
    </Fragment>
  )
}
