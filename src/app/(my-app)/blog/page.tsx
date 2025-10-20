import { getPayload } from 'payload'
import config from '@payload-config'
import BlogClient from './blog-client'

export const metadata = {
  title: 'blog - miiyuh',
  description: 'thoughts, stories, and ideas',
}

// Use dynamic rendering to avoid Server Action caching issues
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPage() {
  const payload = await getPayload({ config })
  
  const { docs: posts } = await payload.find({
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

  const transformedPosts = posts.map((post: any) => {
    const coverImage = typeof post.coverImage === 'object' && post.coverImage
      ? {
          url: post.coverImage.url || `/api/media/file/${post.coverImage.filename}`,
          alt: post.coverImage.alt || post.title,
        }
      : undefined

    return {
      id: String(post.id),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      coverImage,
      publishedAt: post.publishedAt || new Date().toISOString(),
      tags: Array.isArray(post.tags) ? post.tags.map((t: any) => ({ tag: t.tag || '' })) : [],
    }
  })

  return <BlogClient posts={transformedPosts} />
}
