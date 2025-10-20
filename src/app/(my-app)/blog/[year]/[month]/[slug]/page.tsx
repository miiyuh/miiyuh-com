import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { InteractiveDotsBackground } from '@/components'
import { ReadingProgressBar } from '@/components/effects/reading-progress-bar'
import BlogPostContent from './blog-post-content'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ year: string; month: string; slug: string }>
}

async function generateMetadata({ params }: PageProps) {
  const { year, month, slug } = await params
  const payload = await getPayload({ config })
  
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    depth: 1,
  })

  const post = docs[0]
  if (!post) return { title: 'Post Not Found - miiyuh' }
  
  // Verify the post matches the year/month
  const postDate = new Date(post.publishedAt as string)
  const postYear = postDate.getFullYear().toString()
  const postMonth = String(postDate.getMonth() + 1).padStart(2, '0')
  
  if (postYear !== year || postMonth !== month) {
    return { title: 'Post Not Found - miiyuh' }
  }

  return {
    title: `${post.title} - miiyuh`,
    description: post.excerpt || post.seo?.metaDescription,
  }
}

async function Page({ params }: PageProps) {
  const { year, month, slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    depth: 1,
  })

  const post = docs[0]
  if (!post) notFound()
  
  // Verify the post matches the year/month in the URL
  const postDate = new Date(post.publishedAt as string)
  const postYear = postDate.getFullYear().toString()
  const postMonth = String(postDate.getMonth() + 1).padStart(2, '0')
  
  if (postYear !== year || postMonth !== month) {
    notFound()
  }

  // Transform cover image
  const coverImage = post.coverImage
    ? typeof post.coverImage === 'object' && 'url' in post.coverImage
      ? post.coverImage.url
      : null
    : null

  return (
    <main className="relative min-h-screen bg-[#1A1A1A] text-[#FAF3E0]">
      <ReadingProgressBar />
      <InteractiveDotsBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 animate-smooth-slide-up">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#FAF3E0]/60 overflow-hidden">
          <Link href="/" className="hover:text-[#FAF3E0] transition-colours whitespace-nowrap">
            home
          </Link>
          <span className="flex-shrink-0">/</span>
          <Link href="/blog" className="hover:text-[#FAF3E0] transition-colours whitespace-nowrap">
            blog
          </Link>
          <span className="flex-shrink-0">/</span>
          <span className="flex-shrink-0">{year}</span>
          <span className="flex-shrink-0">/</span>
          <span className="flex-shrink-0">{month}</span>
          <span className="flex-shrink-0">/</span>
          <span className="text-[#FAF3E0] truncate">{post.title}</span>
        </nav>

        {/* Cover Image */}
        {coverImage && (
          <div className="mb-8 aspect-video overflow-hidden rounded-lg">
            <img
              src={coverImage}
              alt={post.title as string}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Post Header */}
        <header className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-centre gap-4 text-sm text-[#FAF3E0]/60">
            <time dateTime={post.publishedAt as string}>
              {new Date(post.publishedAt as string).toISOString().split('T')[0]}
            </time>

            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tagItem: any, index: number) => (
                  <span
                    key={index}
                    className="rounded-full bg-[#FAF3E0]/10 px-3 py-1 text-xs"
                  >
                    {tagItem.tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.excerpt && (
            <p className="text-lg text-[#FAF3E0]/80 italic">{post.excerpt}</p>
          )}
        </header>

        {/* Post Content */}
        <BlogPostContent content={post.content} />

        {/* Back to Blog */}
        <footer className="mt-12 border-t border-[#FAF3E0]/20 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-centre gap-2 text-[#FAF3E0] hover:text-[#FAF3E0]/80 transition-colours"
          >
            <span>←</span>
            <span>back to blog</span>
          </Link>
        </footer>
      </div>
    </main>
  )
}

export default Page
