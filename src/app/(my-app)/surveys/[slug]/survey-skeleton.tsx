import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import { TextSkeleton } from '@/components/ui/skeleton'

export function SurveySkeleton() {
  return (
    <main className="bg-bg-primary text-text-primary font-sans min-h-screen flex flex-col relative">
      <section className="relative grow px-8 md:px-32 lg:px-56 xl:px-80 pt-6 pb-24 min-h-[70vh]">
        <div>
          {/* Breadcrumb Navigation */}
          <SimpleBreadcrumb items={breadcrumbs.surveyDetail('survey')} />
          

          {/* Header Section */}
          <div className="mb-12 max-w-4xl">
            {/* Title */}
            <TextSkeleton lines={1} className="mb-6" />

            {/* Description */}
            <TextSkeleton lines={2} className="mb-6" />

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4">
              <TextSkeleton lines={1} className="w-32" />
              <TextSkeleton lines={1} className="w-32" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-4">
            {/* Form - 3 columns */}
            <div className="md:col-span-3 order-2 md:order-1">
              <div className="rounded-xl border border-white/8 bg-white/4 shadow-sm p-6 sm:p-8">
                {/* Form Skeleton */}
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-3">
                      <TextSkeleton lines={1} className="w-48" />
                      <TextSkeleton lines={1} className="h-10" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Link Skeleton */}
              <TextSkeleton lines={1} className="w-32 mt-8" />
            </div>

            {/* Sidebar - 1 column */}
            <aside className="md:col-span-1 order-1 md:order-2 md:border-l border-white/8">
              <div className="md:sticky md:top-24 space-y-6">
                <div className="border-t md:border-b border-white/8 rounded-lg p-0 md:pl-6 pt-4 md:pt-0">
                  <TextSkeleton lines={1} className="w-32 mb-3" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <TextSkeleton key={i} lines={1} />
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
