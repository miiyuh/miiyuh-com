'use client'

import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { Search } from 'lucide-react'

export default function BlogLoading() {
  return (
    <main className="flex flex-col bg-bg-primary text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section className="relative grow px-6 md:px-12 lg:px-24 xl:px-32 min-h-[70vh]" style={{ paddingTop: '24px' }}>
        <div>
          {/* Breadcrumb */}
          <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }} className="px-6 md:px-0">
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'blog' },
              ]}
              className="mb-0"
            />
          </div>

          {/* Header Skeleton */}
          <div className="mb-12 px-0 md:px-0">
            <div className="h-14 md:h-16 w-48 bg-white/5 rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-80 max-w-full bg-white/5 rounded-lg animate-pulse" />
          </div>

          {/* Filter Bar Skeleton */}
          <div className="border-t border-white/8 pt-8 pb-8">
            <div className="space-y-4">
              {/* Search Skeleton */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted opacity-50" />
                <div className="w-full h-10 bg-white/5 rounded-lg animate-pulse" />
              </div>

              {/* Topics Skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-9 w-20 bg-white/5 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blog Cards Skeleton */}
          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-5 p-5 rounded-lg border border-white/8 bg-white/[0.02] animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="relative w-full sm:w-48 shrink-0 aspect-video rounded-md overflow-hidden bg-white/5" />
                {/* Content Skeleton */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
                      <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                    </div>
                    <div className="h-5 w-full bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
