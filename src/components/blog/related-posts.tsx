'use client'

import { useState, useEffect } from 'react'
import { BlogCard } from './blog-card'

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

interface RelatedPostsProps {
  currentPost: BlogPost
  maxPosts?: number
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ 
  currentPost, 
  maxPosts = 3 
}) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        const data = await response.json()
        
        if (data.success) {
          // Filter out current post and find related posts
          const allPosts = data.data.filter((post: BlogPost) => post.id !== currentPost.id)
          
          // Calculate relevance scores
          const scoredPosts = allPosts.map((post: BlogPost) => {
            let score = 0
            
            // Score based on shared categories
            if (currentPost.categories && post.categories) {
              const currentCategories = currentPost.categories.map(c => c.category)
              const postCategories = post.categories.map(c => c.category)
              const sharedCategories = currentCategories.filter(cat => 
                postCategories.includes(cat)
              )
              score += sharedCategories.length * 3
            }
            
            // Score based on shared tags
            if (currentPost.tags && post.tags) {
              const currentTags = currentPost.tags.map(t => t.tag)
              const postTags = post.tags.map(t => t.tag)
              const sharedTags = currentTags.filter(tag => 
                postTags.includes(tag)
              )
              score += sharedTags.length * 2
            }
            
            // Score based on same author
            if (currentPost.author.id === post.author.id) {
              score += 1
            }
            
            return { post, score }
          })
          
          // Sort by score and recency, then take top posts
          const related = scoredPosts
            .sort((a: { post: BlogPost; score: number }, b: { post: BlogPost; score: number }) => {
              if (a.score !== b.score) return b.score - a.score
              return new Date(b.post.publishedDate).getTime() - new Date(a.post.publishedDate).getTime()
            })
            .slice(0, maxPosts)
            .map((item: { post: BlogPost; score: number }) => item.post)
          
          setRelatedPosts(related)
        }
      } catch (error) {
        console.error('Error fetching related posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedPosts()
  }, [currentPost, maxPosts])

  if (loading) {
    return (
      <div>
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-1 h-8 bg-[#FAF3E0] rounded-full"></span>
          Related Posts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div 
              key={index}
              className="animate-pulse border border-[#FAF3E0]/10 rounded-xl p-6 bg-[#FAF3E0]/5"
            >
              <div className="aspect-video bg-[#FAF3E0]/10 rounded-lg mb-4"></div>
              <div className="h-4 bg-[#FAF3E0]/10 rounded mb-2"></div>
              <div className="h-4 bg-[#FAF3E0]/10 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-[#FAF3E0]/10 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <span className="w-1 h-8 bg-[#FAF3E0] rounded-full"></span>
        Related Posts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            post={post}
            layout="card"
            showImage={true}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
