'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useReadingTime } from './rich-text-renderer'

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
  featured?: boolean
  createdAt: string
  updatedAt: string
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  layout?: 'card' | 'list'
  showImage?: boolean
  index?: number
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  featured = false,
  layout = 'card',
  showImage = true,
  index = 0
}) => {
  const readingTime = useReadingTime(post.content)

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
      tutorial: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      review: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  }

  if (featured) {
    return (
      <article className="group mb-8">
        <Link href={`/blog/${post.slug}`}>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#FAF3E0]/10 to-[#FAF3E0]/5 border border-[#FAF3E0]/20 hover:border-[#FAF3E0]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#FAF3E0]/5">
            
            {/* Featured Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-[#FAF3E0]/90 text-[#1A1A1A] text-xs font-semibold rounded-full">
                ⭐ Featured
              </span>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              {post.featuredImage && showImage && (
                <div className="lg:w-2/5 relative aspect-video lg:aspect-square overflow-hidden">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority={index === 0}
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 p-6 lg:p-8">
                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.slice(0, 2).map((cat, idx) => (
                      <span 
                        key={idx}
                        className={`px-3 py-1 text-sm rounded-full border ${getCategoryBadgeColor(cat.category)}`}
                      >
                        {cat.category}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-[#FAF3E0] transition-colors duration-300">
                  {post.title}
                </h2>

                <p className="text-lg text-[#FAF3E0]/80 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-[#FAF3E0]/60">
                  <div className="flex items-center gap-4">
                    <span>By {post.author.name || post.author.email}</span>
                    <span>•</span>
                    <time dateTime={post.publishedDate}>
                      {formatDate(post.publishedDate)}
                    </time>
                    <span>•</span>
                    <span>{readingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors">
                    <span>Read more</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  if (layout === 'list') {
    return (
      <article className="group">
        <Link href={`/blog/${post.slug}`}>
          <div className="flex items-start gap-6 p-6 rounded-xl border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 hover:bg-[#FAF3E0]/5 transition-all duration-300">
            
            {/* Image */}
            {post.featuredImage && showImage && (
              <div className="flex-shrink-0 w-24 h-24 relative rounded-lg overflow-hidden bg-[#FAF3E0]/5">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-semibold group-hover:text-[#FAF3E0] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <time className="flex-shrink-0 text-xs text-[#FAF3E0]/50">
                  {formatDate(post.publishedDate)}
                </time>
              </div>

              <p className="text-sm text-[#FAF3E0]/70 mb-3 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-3 text-xs text-[#FAF3E0]/50">
                <span>{readingTime}</span>
                {post.categories && post.categories.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{post.categories[0].category}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  // Default card layout
  return (
    <article 
      className="group transition-all duration-500"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="border border-[#FAF3E0]/10 rounded-xl hover:border-[#FAF3E0]/30 hover:bg-[#FAF3E0]/5 transition-all duration-300 cursor-pointer overflow-hidden">
          
          {/* Image */}
          {post.featuredImage && showImage && (
            <div className="relative aspect-video overflow-hidden bg-[#FAF3E0]/5">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="p-6">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories.slice(0, 2).map((cat, idx) => (
                  <span 
                    key={idx}
                    className={`px-2 py-1 text-xs rounded-full border ${getCategoryBadgeColor(cat.category)}`}
                  >
                    {cat.category}
                  </span>
                ))}
              </div>
            )}
            
            <h2 className="text-xl font-bold mb-3 group-hover:text-[#FAF3E0] transition-colors duration-300 line-clamp-2">
              {post.title}
            </h2>
            
            <p className="text-[#FAF3E0]/70 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-sm text-[#FAF3E0]/50">
              <div className="flex items-center gap-2">
                <time dateTime={post.publishedDate}>
                  {formatDate(post.publishedDate)}
                </time>
                <span>•</span>
                <span>{readingTime}</span>
              </div>
              <div className="flex items-center gap-2 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors">
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
