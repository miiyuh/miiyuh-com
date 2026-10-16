import type { Metadata } from 'next'
import { isValidLocale, pageAlternates } from '@/lib/locale'
import { Suspense } from 'react'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { breadcrumbs } from '@/config/breadcrumbs'
import BlogPostsSection from './blog-posts-section'
import BlogPostsSkeleton from './blog-posts-skeleton'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return {
    title: 'blog - miiyuh.com',
    description: 'little thoughts, big ideas, lofty dreams, all sorts, written by miiyuh.',
    alternates: pageAlternates('/blog', locale),
  }
}

type SearchParams = Record<string, string | string[] | undefined>

type PageProps = {
  params: Promise<{ locale: string }>
  searchParams?: Promise<SearchParams>
}

export default function BlogPage({ params, searchParams }: PageProps) {
  return (
    <main className="flex flex-col bg-bg-primary text-text-primary font-sans relative min-h-screen">
      <section className="relative grow px-8 md:px-16 lg:px-32 xl:px-56 2xl:px-80 pt-6 pb-16 min-h-[70vh]">
          <div>
            <SimpleBreadcrumb items={breadcrumbs.blog()} className="-mx-8 px-8 md:mx-0 md:px-0" />
            

          <div className="mb-8 animate-page-in">
            <h1 className="text-5xl md:text-6xl font-notch tracking-tight mb-4 text-text-primary text-balance">
              blog
            </h1>
            <p className="text-lg md:text-xl text-text-secondary text-pretty">
              little thoughts, big ideas, lofty dreams, all sorts!
            </p>
          </div>

          <Suspense fallback={<BlogPostsSkeleton />}>
            <BlogPostsSection params={params} searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
