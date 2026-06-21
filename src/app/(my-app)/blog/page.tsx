import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import BlogPostsSection from './blog-posts-section'
import BlogPostsSkeleton from './blog-posts-skeleton'

export const metadata: Metadata = {
  title: 'blog - miiyuh',
  description: 'thoughts, stories, and ideas',
}

type SearchParams = Record<string, string | string[] | undefined>

type PageProps = {
  searchParams?: Promise<SearchParams>
}

export default function BlogPage({ searchParams }: PageProps) {
  return (
    <main className="flex flex-col bg-bg-primary text-text-primary font-sans relative min-h-screen">
      <section className="relative grow px-8 md:px-32 lg:px-56 xl:px-80 pt-6 pb-24 min-h-[70vh]">
          <div>
            <SimpleBreadcrumb items={breadcrumbs.blog()} />
            

          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-text-primary text-balance">
              blog
            </h1>
            <p className="text-lg md:text-xl text-text-secondary text-pretty">
              little thoughts, big ideas, lofty dreams, all sorts!
            </p>
          </div>

          <Suspense fallback={<BlogPostsSkeleton />}>
            <BlogPostsSection searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
