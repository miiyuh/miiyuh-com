'use client'

import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Post {
  id: string
  title: string
  content: any // Rich text content
  publishedDate: string
  slug: string
  status: string
  featuredImage?: {
    url: string
    alt: string
  }
  author: {
    id: string
    email: string
  }
  tags?: Array<{tag: string}>
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts?slug=${slug}`)
        if (!response.ok) {
          throw new Error('Failed to fetch post')
        }
        
        const data = await response.json()
        if (!data || data.docs.length === 0) {
          notFound()
          return
        }
        
        setPost(data.docs[0])
      } catch (err) {
        console.error('Error fetching post:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    
    if (slug) {
      fetchPost()
    }
  }, [slug])
  
  if (loading) {
    return (
      <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans">
        <section className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FAF3E0]"></div>
          <p className="mt-4">Loading post...</p>
        </section>
      </main>
    )
  }
  
  if (error || !post) {
    return (
      <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans">
        <section className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Error Loading Post</h1>
          <p className="mb-6">Sorry, we couldn't load this blog post.</p>
          <Link
            href="/blog"
            className="inline-block bg-[#FAF3E0] text-[#1A1A1A] px-6 py-3 rounded-md font-medium hover:bg-[#FAF3E0]/90 transition-colors"
          >
            Back to Blog
          </Link>
        </section>
      </main>
    )
  }
  
  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans">
      <section className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh]">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-[#FAF3E0]/80 hover:text-[#FAF3E0] mb-8"
        >
          <span className="mr-2">←</span> Back to Blog
        </Link>
        
        {post.featuredImage && (
          <div className="mb-8">
            <img 
              src={post.featuredImage.url} 
              alt={post.featuredImage.alt || post.title} 
              className="w-full rounded-lg max-h-[500px] object-cover"
            />
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags?.map((tag, i) => (
            <span key={i} className="text-xs bg-[#FAF3E0]/10 px-2 py-1 rounded">
              {tag.tag}
            </span>
          ))}
        </div>
        
        <div className="text-sm text-[#FAF3E0]/60 mb-8">
          {post.publishedDate && (
            <span>
              {new Date(post.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          )}
          {post.author && (
            <span className="ml-3">by {post.author.email}</span>
          )}
        </div>
        
        <div className="prose prose-invert max-w-none">
          {/* This is a placeholder for rich text content */}
          <p className="text-[#FAF3E0]/80">
            This post's content will be displayed here once the PayloadCMS API endpoint is fully set up.
          </p>
        </div>
      </section>
    </main>
  )
}
