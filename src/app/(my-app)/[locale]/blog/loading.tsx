import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import BlogPostsSkeleton from './blog-posts-skeleton'

export default function BlogLoading() {
  return (
    <main className="flex flex-col bg-bg-primary text-text-primary font-sans relative min-h-screen">
      <section className="relative grow px-8 md:px-32 lg:px-56 xl:px-80 pt-6 pb-16 min-h-[70vh]">
        <div>
          <SimpleBreadcrumb items={breadcrumbs.blog()} className="-mx-8 px-8 md:mx-0 md:px-0" />

          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="h-14 md:h-16 w-32 bg-white/5 rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-full max-w-xl bg-white/5 rounded-lg animate-pulse" />
          </div>

          <BlogPostsSkeleton />
        </div>
      </section>
    </main>
  )
}
