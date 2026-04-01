import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Fragment, Suspense } from 'react'

import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { Separator } from '@/components/ui/separator'
import { RefreshRouteOnSave } from '@/components/live-preview'
import BlogPostContent from './blog-post-content'
import { BlogPostSkeleton } from './blog-post-skeleton'
import type { BlogPostDocument } from '@/types/blog'
import { resolveMediaSrc } from '@/utils/media'
import { extractTocFromLexical } from '@/utils/extract-toc'

// ISR: Revalidate every 60 seconds for faster repeat visits
export const revalidate = 60

type PageParams = { year: string; month: string; slug: string }

type PageProps = {
  params: Promise<PageParams>
}

export async function generateMetadata({ params }: PageProps) {
  const { year, month, slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
    depth: 0,
    limit: 1,
    select: {
      title: true,
      excerpt: true,
      seo: true,
      publishedAt: true,
    },
  })

  const [post] = docs as BlogPostDocument[]
  if (!post) return { title: 'Post Not Found - miiyuh' }

  // Verify the post matches the year/month (using Malaysia timezone)
  const [postYear, postMonth] = new Date(post.publishedAt as string)
    .toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' })
    .split('-')

  if (postYear !== year || postMonth !== month) {
    return { title: 'Post Not Found - miiyuh' }
  }

  return {
    title: `${post.title} - miiyuh`,
    description: post.excerpt || post.seo?.metaDescription,
  }
}

async function PageContent({ params }: PageProps) {
  const { year, month, slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
    depth: 1,
    limit: 1,
  })

  const [post] = docs as BlogPostDocument[]
  if (!post) notFound()

  // Verify the post matches the year/month in the URL (using Malaysia timezone)
  const [postYear, postMonth] = new Date(post.publishedAt as string)
    .toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' })
    .split('-')

  if (postYear !== year || postMonth !== month) {
    notFound()
  }

  // Transform cover image
  const coverImage = resolveMediaSrc({
    url: typeof post.coverImage === 'object' ? post.coverImage?.url : undefined,
    filename: typeof post.coverImage === 'object' ? post.coverImage?.filename : undefined,
  })

  const publishedAtDate = post.publishedAt ? new Date(post.publishedAt) : null

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <main className="relative min-h-screen text-[#FAF3E0]">


      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 sm:px-6 lg:px-8 animate-smooth-slide-up">
        {/* Breadcrumbs */}
        <SimpleBreadcrumb
          items={[
            { label: 'home', href: '/' },
            { label: 'blog', href: '/blog' },
            { label: year },
            { label: month },
            { label: post.title },
          ]}
          className="mb-8"
        />

        {/* Cover Image */}
        {coverImage && (
          <div className="mb-8 aspect-video overflow-hidden rounded-lg relative">
            <Image
              src={coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            />
          </div>
        )}

        {/* Post Header */}
        <header className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif text-balance">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[#FAF3E0]/60">
            {publishedAtDate && (
              <time dateTime={publishedAtDate.toISOString()}>
                {publishedAtDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' })}
              </time>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tagItem, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-[#FAF3E0]/10 px-3 py-1 text-xs"
                  >
                    {tagItem?.tag ?? 'untagged'}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.excerpt && (
            <p
              className="text-lg text-[#FAF3E0]/80"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
            >
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Separator after excerpt */}
        <Separator className="my-8 bg-white/10" />

        {/* Post Content */}
        <BlogPostContent content={post.content ?? null} toc={extractTocFromLexical(post.content)} />

        {/* Back to Blog */}
        <footer className="mt-12 border-t border-[#FAF3E0]/10 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#FAF3E0] hover:text-[#FAF3E0]/80 transition-colors"
          >
            <span>←</span>
            <span>back to blog</span>
          </Link>
        </footer>
      </div>
    </main>
    </Fragment>
  )
}

function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <PageContent params={params} />
    </Suspense>
  )
}

export default Page
