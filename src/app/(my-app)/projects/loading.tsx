'use client'

import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'

export default function ProjectsLoading() {
  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section className="relative grow py-24" style={{ paddingTop: '24px' }}>
        <div className="animate-in fade-in duration-300">
          <div className="px-8 md:px-32 lg:px-56 xl:px-80">
            <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
              <SimpleBreadcrumb
                items={[
                  { label: 'home', href: '/' },
                  { label: 'projects' },
                ]}
                className="mb-0"
              />
            </div>

            <div className="mb-8 max-w-4xl">
              <div className="h-14 md:h-16 w-52 bg-white/5 rounded-lg animate-pulse mb-4" />
              <div className="h-6 w-full max-w-xl bg-white/5 rounded-lg animate-pulse" />
            </div>
          </div>

          <div className="px-8 md:px-32 lg:px-56 xl:px-80 space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-7">
                <div className="h-3.5 w-28 bg-white/5 rounded animate-pulse" />
                <div className="flex-1 border-t border-white/6" />
                <div className="h-3.5 w-16 bg-white/5 rounded animate-pulse" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden border border-white/8 bg-[#0c0c0e]"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="aspect-video bg-white/5 animate-pulse" />
                    <div className="p-6 space-y-4">
                      <div className="h-3.5 w-32 bg-white/5 rounded animate-pulse" />
                      <div className="h-7 w-4/5 bg-white/5 rounded animate-pulse" />
                      <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
                      <div className="h-6 w-2/5 bg-white/5 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-7">
                <div className="h-3.5 w-40 bg-white/5 rounded animate-pulse" />
                <div className="flex-1 border-t border-white/6" />
                <div className="h-3.5 w-16 bg-white/5 rounded animate-pulse" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/8 bg-[#0c0c0e] p-5 md:p-6 space-y-4"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="h-6 w-4/5 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-4/5 bg-white/5 rounded animate-pulse" />
                    <div className="h-5 w-1/2 bg-white/5 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
