import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'
import { RichTextRenderer } from '@/components/blog/rich-text-renderer'
import { RelatedPosts } from '@/components/blog/related-posts'
import { generateBlogMetadata, generateBlogJsonLd } from '@/utils/seo'
import { Metadata } from 'next'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: Record<string, unknown>
  featuredImage?: {
    url: string
    alt: string
    width: number
    height: number
  }
  author: {
    id: string
    email: string
    name: string
  }
  categories?: Array<{
    category: string
  }>
  tags?: Array<{
    tag: string
  }>
  publishedDate: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { isEnabled: isDraftMode } = await draftMode()
  
  try {
    if (isDraftMode) {
      // For draft mode, we need to use the PayloadCMS API directly
      // This should be the internal API, not the frontend API
      const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
      const endpoint = `${baseUrl}/api/blog-posts?where[slug][equals]=${slug}&draft=true&limit=1`
      
      const response = await fetch(endpoint, {
        next: { revalidate: 0 }, // Don't cache drafts
      })
      
      if (response.ok) {
        const data = await response.json()
        return data.docs?.[0] || null
      }
    } else {
      // For published posts, use your existing frontend API
      const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
      const response = await fetch(`${baseUrl}/api/blog/${slug}`, {
        next: { revalidate: 60 },
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          return data.data
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | miiyuh.com',
      description: 'The requested blog post could not be found.',
    }
  }
  
  return generateBlogMetadata({ post })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    notFound()
  }

  // Calculate reading time (simplified version for server component)
  const getReadingTime = (content: Record<string, unknown>): number => {
    const extractText = (content: unknown): string => {
      if (!content) return ''
      
      if (Array.isArray(content)) {
        return content.map(extractText).join(' ')
      }
      
      if (typeof content === 'object' && content !== null) {
        const obj = content as Record<string, unknown>
        if ('text' in obj) return String(obj.text || '')
        if ('children' in obj) return extractText(obj.children)
        if ('content' in obj) return extractText(obj.content)
        
        return Object.values(obj).map(extractText).join(' ')
      }
      
      return String(content || '')
    }
    
    const text = extractText(content)
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    return Math.ceil(words.length / 200) // 200 words per minute
  }

  const readingTime = getReadingTime(post.content)
  const jsonLd = generateBlogJsonLd(post)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      technology: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      design: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      photography: 'bg-green-500/20 text-green-300 border-green-500/30',
      personal: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      travel: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    }
    return colors[category as keyof typeof colors] || 'bg-[#FAF3E0]/10 text-[#FAF3E0]/70 border-[#FAF3E0]/20'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-[#1A1A1A] text-[#FAF3E0] relative overflow-hidden">
        <InteractiveDotsBackground />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="container mx-auto px-4 pt-32 pb-16">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-8">
                <Link 
                  href="/blog" 
                  className="text-[#FAF3E0]/60 hover:text-[#FAF3E0] transition-colors"
                >
                  ← Back to Blog
                </Link>
              </nav>

              {/* Featured Image */}
              {post.featuredImage && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    width={post.featuredImage.width || 800}
                    height={post.featuredImage.height || 400}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-[#FAF3E0] mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-[#FAF3E0]/60 mb-8">
                <div className="flex items-center gap-2">
                  <span>By</span>
                  <span className="text-[#FAF3E0] font-medium">{post.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Published</span>
                  <time 
                    dateTime={post.publishedDate}
                    className="text-[#FAF3E0]"
                  >
                    {formatDate(post.publishedDate)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <span>{readingTime} min read</span>
                </div>
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <div className="text-xl text-[#FAF3E0]/80 mb-8 font-light leading-relaxed">
                  {post.excerpt}
                </div>
              )}

              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.categories.map((cat: { category: string }, idx: number) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-sm border ${getCategoryBadgeColor(cat.category)}`}
                    >
                      {cat.category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg prose-invert max-w-none">
                <RichTextRenderer content={post.content} />
              </article>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[#FAF3E0]/10">
                  <h3 className="text-[#FAF3E0] font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag: { tag: string }, idx: number) => (
                      <span
                        key={idx}
                        className="bg-[#FAF3E0]/10 text-[#FAF3E0]/70 px-3 py-1 rounded-full text-sm border border-[#FAF3E0]/20 hover:bg-[#FAF3E0]/20 transition-colors"
                      >
                        #{tag.tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-[#FAF3E0]/50 px-3 py-1 text-sm">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="mt-12 pt-8 border-t border-[#FAF3E0]/10">
                <div className="bg-[#FAF3E0]/10 rounded-xl p-6 border border-[#FAF3E0]/20">
                  <h3 className="text-[#FAF3E0] font-semibold mb-2">About the Author</h3>
                  <p className="text-[#FAF3E0]/70">
                    Written by <span className="text-[#FAF3E0] font-medium">{post.author.name}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto">
              <RelatedPosts currentPost={post} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
