'use client'

import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { TextSkeleton } from '@/components/ui/skeleton'

export function SurveySkeleton() {
  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section className="relative grow py-24" style={{ paddingTop: '24px' }}>
        <div className="px-6 md:px-12 lg:px-24 xl:px-32">
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'surveys', href: '/surveys' },
                { label: 'survey', href: '#' },
              ]}
              className="mb-0"
            />
          </div>

          {/* Header Section */}
          <div className="mb-12 max-w-4xl">
            {/* Title */}
            <TextSkeleton lines={1} className="mb-6" />

            {/* Description */}
            <TextSkeleton lines={2} className="mb-6" />

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4">
              <div className="h-5 bg-white/5 rounded-lg animate-pulse w-32" />
              <div className="h-5 bg-white/5 rounded-lg animate-pulse w-32" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-4">
            {/* Form - 3 columns */}
            <div className="md:col-span-3 order-2 md:order-1">
              <div className="rounded-xl border border-white/8 bg-white/3 p-6 sm:p-8">
                {/* Form Skeleton */}
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-5 bg-white/5 rounded-lg animate-pulse w-48" />
                      <div className="h-10 bg-white/5 rounded-lg animate-pulse w-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Link Skeleton */}
              <div className="h-5 bg-white/5 rounded-lg animate-pulse w-32 mt-8" />
            </div>

            {/* Sidebar - 1 column */}
            <aside className="md:col-span-1 order-1 md:order-2 md:border-l border-white/8">
              <div className="md:sticky md:top-24 space-y-6">
                <div className="border-t md:border-b border-white/8 rounded-lg p-0 md:pl-6 pt-4 md:pt-0">
                  <div className="h-6 bg-white/5 rounded-lg animate-pulse w-32 mb-3" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-5 bg-white/5 rounded-lg animate-pulse w-full" />
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
