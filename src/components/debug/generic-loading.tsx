'use client'

import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { LucideIcon } from 'lucide-react'

interface GenericLoadingProps {
  breadcrumbLabel: string
  title?: string
  showSearch?: boolean
  showFilters?: boolean
  gridCols?: number
  cardCount?: number
  searchIcon?: LucideIcon
  filterIcon?: LucideIcon
}

export function GenericLoading({
  breadcrumbLabel,
  title,
  showSearch = false,
  showFilters = false,
  gridCols = 3,
  cardCount = 6,
  searchIcon: SearchIcon,
  filterIcon: FilterIcon,
}: GenericLoadingProps) {
  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section className="relative grow py-24" style={{ paddingTop: '24px' }}>
        <div className="animate-in fade-in duration-300">
          <div className="px-6 md:px-12 lg:px-24 xl:px-32">
            {/* Breadcrumb */}
            <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
              <SimpleBreadcrumb
                items={[
                  { label: 'home', href: '/' },
                  { label: breadcrumbLabel },
                ]}
                className="mb-0"
              />
            </div>

            {/* Header Skeleton */}
            <div className="mb-12 max-w-4xl">
              <div className="h-14 md:h-16 w-48 bg-white/5 rounded-lg animate-pulse mb-8" />
              {title && <div className="h-6 w-80 max-w-full bg-white/5 rounded-lg animate-pulse" />}
            </div>

            {/* Search & Filters */}
            {(showSearch || showFilters) && (
              <div className="mb-12 flex flex-col md:flex-row gap-4">
                {showSearch && SearchIcon && (
                  <div className="flex-1 relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted opacity-50" />
                    <div className="w-full h-12 bg-white/5 rounded-xl border border-white/10 animate-pulse" />
                  </div>
                )}
                {showFilters && FilterIcon && (
                  <div className="flex items-center gap-2">
                    <FilterIcon className="w-4 h-4 text-text-muted opacity-50" />
                    <div className="h-10 w-32 bg-white/5 rounded-lg animate-pulse" />
                    <div className="h-10 w-32 bg-white/5 rounded-lg animate-pulse" />
                    <div className="h-10 w-32 bg-white/5 rounded-lg animate-pulse" />
                  </div>
                )}
              </div>
            )}

            {/* Grid Skeleton */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${gridCols} gap-6`}>
              {Array.from({ length: cardCount }).map((_, index) => (
                <div
                  key={index}
                  className="glass-panel-pro rounded-3xl overflow-hidden h-64"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="h-full bg-white/5 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
