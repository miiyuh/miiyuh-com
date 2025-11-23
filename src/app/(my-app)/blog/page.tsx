import { getPayload } from 'payload'
import config from '@payload-config'
import BlogClient from './blog-client'
import type { BlogPostCard, BlogPostDocument } from '@/types/blog'

export const metadata = {
  title: 'blog - miiyuh',
  description: 'thoughts, stories, and ideas',
}

// Use dynamic rendering to avoid Server Action caching issues
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPage() {
  const payload = await getPayload({ config })
  
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 1,
    sort: '-publishedAt',
    limit: 50,
  })

  const posts = docs as BlogPostDocument[]

  const transformedPosts: BlogPostCard[] = posts.map((post) => {
    const coverImageData =
      typeof post.coverImage === 'object' && post.coverImage ? post.coverImage : null

    const coverImageUrl = coverImageData?.url ??
      (coverImageData?.filename ? `/api/media/file/${coverImageData.filename}` : undefined)

    const coverImage = coverImageUrl
      ? {
          url: coverImageUrl,
          alt: coverImageData?.alt ?? post.title,
          caption: coverImageData?.caption ?? undefined,
        }
      : undefined

    return {
      id: String(post.id),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? '',
      coverImage: coverImage?.url ? coverImage : undefined,
      publishedAt: post.publishedAt ?? new Date().toISOString(),
      tags: post.tags?.map((tag) => ({ tag: tag?.tag ?? '' })) ?? [],
    }
  })

  return <BlogClient posts={transformedPosts} />
}
