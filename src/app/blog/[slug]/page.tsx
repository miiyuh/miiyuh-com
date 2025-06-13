'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { sanity, queries, urlFor, type BlogPost } from '../../../../lib/sanity'
import { BlogContent } from '@/components/blog-content'

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.slug) return

      try {
        setIsLoading(true)
        const postData = await sanity.fetch(queries.postBySlug, { 
          slug: params.slug 
        })
        
        if (!postData) {
          setError('Post not found')
          return
        }
        
        setPost(postData)
        setError(null)
      } catch (err) {
        console.error('Error fetching post:', err)
        setError('Failed to load blog post. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative min-h-screen">
        <div className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FAF3E0] mx-auto mb-4"></div>
            <p className="text-[#FAF3E0]/70">Loading blog post...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative min-h-screen">
        <div className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter mb-6">
              post not found
            </h1>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto mb-8">
              <p className="text-red-300 text-sm">{error || 'This blog post could not be found.'}</p>
            </div>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-[#FAF3E0]/70 hover:text-[#FAF3E0] transition-colors"
            >
              <ArrowLeft size={16} />
              back to blog
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative min-h-screen">
      <article className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}          <div className="mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-[#FAF3E0]/70 hover:text-[#FAF3E0] transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              back to blog
            </Link>          </div>

          {/* Article Header */}
          <header className="mb-8">
            {/* Category */}
            {post.category && (
              <div className="mb-4">
                <span 
                  className="text-sm font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: post.category.color || '#FAF3E0',
                    color: '#1A1A1A'
                  }}
                >
                  {post.category.title}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold lowercase tracking-tighter mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-[#FAF3E0]/80 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#FAF3E0]/60 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time>{formatDate(post.publishedAt)}</time>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readTime} min read</span>
                </div>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: { _id: string; title: string }) => (
                      <span key={tag._id} className="text-[#FAF3E0]/50">
                        #{tag.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-12">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <Image
                  src={urlFor(post.coverImage).width(1200).height(675).url()}
                  alt={post.coverImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <BlogContent content={post.content} />          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-[#FAF3E0]/10">
            <div className="flex justify-between items-center">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-[#FAF3E0]/70 hover:text-[#FAF3E0] transition-colors"
              >
                <ArrowLeft size={16} />
                back to all posts
              </Link>
              <div className="text-sm text-[#FAF3E0]/50">
                last updated: {formatDate(post._updatedAt)}
              </div>
            </div>
          </footer>
        </div>
      </article>
    </main>
  )
}
