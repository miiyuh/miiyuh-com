import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import { ImageSkeleton, TextSkeleton, TagSkeleton } from '@/components/ui/skeleton'
import { Fragment } from 'react'

export function ProjectDetailSkeleton() {
  return (
    <Fragment>
      <main className="relative min-h-screen text-text-primary">
        <div className="px-8 md:px-32 lg:px-56 xl:px-80 pt-6 pb-16">
          <SimpleBreadcrumb
            items={breadcrumbs.projectDetail('project')}
            className="-mx-8 px-8 md:mx-0 md:px-0"
          />

          {/* Back link */}
          <div className="h-5 bg-white/5 rounded animate-pulse w-32 mb-12" />

          {/* Header: logo + title, description, meta row, chips, links */}
          <div className="mb-12 space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-12 md:size-14 shrink-0 bg-white/5 rounded-lg animate-pulse" />
              <div className="h-12 bg-white/5 rounded-lg animate-pulse w-72" />
            </div>

            <TextSkeleton lines={2} />

            <div className="h-4 bg-white/5 rounded animate-pulse w-64" />

            <TagSkeleton count={3} />

            <div className="flex gap-6">
              <div className="h-5 bg-white/5 rounded animate-pulse w-16" />
              <div className="h-5 bg-white/5 rounded animate-pulse w-12" />
            </div>
          </div>

          {/* Screenshot — constrained, not a hero */}
          <div className="mb-12 max-w-2xl">
            <ImageSkeleton className="aspect-video rounded-lg" />
          </div>

          {/* Write-up + TOC rail */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
            <div className="space-y-4">
              <TextSkeleton lines={6} />
            </div>
            <div className="hidden lg:block border-l border-white/10 pl-8">
              <div className="w-64 space-y-3">
                <div className="h-4 bg-white/5 rounded animate-pulse w-24" />
                <div className="h-3 bg-white/5 rounded animate-pulse w-40" />
                <div className="h-3 bg-white/5 rounded animate-pulse w-32" />
                <div className="h-3 bg-white/5 rounded animate-pulse w-36" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  )
}
