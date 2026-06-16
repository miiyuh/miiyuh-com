'use client'

import { MagnifyingGlass } from '@phosphor-icons/react'

export default function BlogPostsSkeleton() {
  return (
    <div>
      <div className="border-t border-white/8 pt-8 pb-8">
        <div className="space-y-4">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted opacity-50" />
            <div className="w-full h-10 bg-white/5 rounded-lg animate-pulse" />
          </div>

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

      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-5 p-5 rounded-lg border border-white/8 bg-white/2 animate-pulse"
          >
            <div className="relative w-full sm:w-48 shrink-0 aspect-video rounded-md overflow-hidden bg-white/5" />
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
  )
}
