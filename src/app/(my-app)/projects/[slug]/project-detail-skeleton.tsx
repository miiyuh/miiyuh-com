'use client'

import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { ImageSkeleton, TextSkeleton, TagSkeleton } from '@/components/ui/skeleton'
import { Fragment } from 'react'

export function ProjectDetailSkeleton() {
  return (
    <Fragment>
      <main className="relative min-h-screen text-text-primary">
        <div className="px-6 md:px-12 lg:px-24 xl:px-32 py-16">
          {/* Breadcrumbs */}
          <SimpleBreadcrumb
            items={[
              { label: 'home', href: '/' },
              { label: 'projects', href: '/projects' },
              { label: 'project', href: '#' },
            ]}
            className="mb-8"
          />

          {/* Header Section */}
          <div className="mb-12 space-y-6">
            {/* Title + Metadata */}
            <div className="space-y-4">
              <TextSkeleton lines={1} />
              <TagSkeleton count={3} />
            </div>

            {/* Description */}
            <TextSkeleton lines={3} />
          </div>

          {/* Project Image (if exists) */}
          <div className="mb-12">
            <ImageSkeleton className="aspect-video" />
          </div>

          {/* Project Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left Side */}
            <div className="space-y-6">
              <div>
                <div className="h-5 bg-white/5 rounded-lg animate-pulse w-32 mb-3" />
                <TextSkeleton lines={2} />
              </div>
              <div>
                <div className="h-5 bg-white/5 rounded-lg animate-pulse w-32 mb-3" />
                <TagSkeleton count={4} />
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              <div>
                <div className="h-5 bg-white/5 rounded-lg animate-pulse w-32 mb-3" />
                <TextSkeleton lines={2} />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-4 mb-12">
            <div className="h-6 bg-white/5 rounded-lg animate-pulse w-40" />
            <TextSkeleton lines={6} />
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <div className="h-10 bg-white/5 rounded-lg animate-pulse w-32" />
            <div className="h-10 bg-white/5 rounded-lg animate-pulse w-32" />
          </div>
        </div>
      </main>
    </Fragment>
  )
}
