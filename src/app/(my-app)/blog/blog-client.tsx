'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: {
    url?: string
    alt?: string
  }
  publishedAt?: string
  tags?: { tag: string }[]
}

interface BlogClientProps {
  posts: Post[]
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Extract all unique topics from posts
  const allTopics = Array.from(
    new Set(
      posts.flatMap((post) => 
        post.tags?.map((tagItem) => tagItem.tag) || []
      )
    )
  ).sort()

  // Filter posts based on selected topics
  const filteredPosts = selectedTopics.length === 0 
    ? posts 
    : posts.filter((post) =>
        post.tags?.some((tagItem) => selectedTopics.includes(tagItem.tag))
      )

  // Toggle topic selection
  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedTopics([])
  }

  // Helper function to generate blog post URL
  const getPostUrl = (post: Post) => {
    if (!post.publishedAt) return `/blog/${post.slug}`
    const date = new Date(post.publishedAt)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `/blog/${year}/${month}/${post.slug}`
  }

  // Group posts by year and month
  const groupedPosts = filteredPosts.reduce((acc, post) => {
    if (!post.publishedAt) return acc
    
    const date = new Date(post.publishedAt)
    const year = date.getFullYear()
    const month = date.toLocaleString('en-GB', { month: 'long' })
    const monthNum = String(date.getMonth() + 1).padStart(2, '0')
    const key = `${year}-${monthNum}`
    
    if (!acc[key]) {
      acc[key] = {
        year,
        month,
        monthNum,
        posts: []
      }
    }
    
    acc[key].posts.push(post)
    return acc
  }, {} as Record<string, { year: number; month: string; monthNum: string; posts: Post[] }>)

  // Sort groups by year and month (newest first)
  const sortedGroups = Object.entries(groupedPosts).sort((a, b) => b[0].localeCompare(a[0]))

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">
      <InteractiveDotsBackground />

      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh]">
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <nav className="w-full mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-[#FAF3E0]/60">
              <li>
                <Link href="/" className="hover:text-[#FAF3E0] transition-colors duration-300">
                  miiyuh
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <span className="text-[#FAF3E0]/90">blog</span>
              </li>
            </ol>
          </nav>

          <div className="mb-12">
            <div className="mb-6">
              <h1 className="text-5xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                blog <span className="emoji-primary">📰</span>
              </h1>
              <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
            </div>
            <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
              thoughts, stories, and ideas from my journey.
            </p>
          </div>

          {/* Main content with sidebar */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Posts Section */}
            <div className="flex-1 min-w-0 lg:border-r lg:border-[#FAF3E0]/10 lg:pr-12">
              {filteredPosts.length > 0 ? (
                <div className="space-y-16">
              {sortedGroups.map(([key, group]) => (
                <div key={key}>
                  {/* Year and Month Heading */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-4">
                      <h2 className="text-4xl font-bold text-[#FAF3E0] font-serif italic">
                        {group.year}
                      </h2>
                      <h3 className="text-2xl font-medium text-[#FAF3E0]/70">
                        {group.month}
                      </h3>
                    </div>
                    <div className="w-16 h-0.5 bg-[#FAF3E0]/30 mt-3"></div>
                  </div>

                  {/* Posts for this month */}
                  <div className="space-y-8">
                    {group.posts.map((post) => (
                      <Link 
                        key={post.id}
                        href={getPostUrl(post)}
                        className="group block"
                      >
                        <article className="flex flex-col md:flex-row items-start gap-6 md:gap-8 transition-all duration-300">
                          {/* Cover Image - Top on mobile, Right on desktop */}
                          {post.coverImage?.url && (
                            <div className="w-full md:w-48 h-48 md:h-36 md:order-2 flex-shrink-0 overflow-hidden rounded-lg bg-[#FAF3E0]/10">
                              <img 
                                src={post.coverImage.url}
                                alt={post.coverImage.alt || post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          
                          {/* Content - Below image on mobile, Left on desktop */}
                          <div className="flex-1 min-w-0 md:order-1">
                            {/* Date */}
                            {post.publishedAt && (
                              <time
                                dateTime={post.publishedAt}
                                className="text-sm text-[#FAF3E0]/60 mb-2 block"
                              >
                                {new Date(post.publishedAt).toISOString().split('T')[0]}
                              </time>
                            )}
                            
                            {/* Title with Arrow */}
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <h3 className="text-2xl md:text-3xl font-bold text-[#FAF3E0] group-hover:text-[#FAF3E0]/80 transition-colors duration-300 flex-1">
                                {post.title}
                              </h3>
                              
                              <span className="text-2xl md:text-3xl text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-all duration-300 group-hover:translate-x-1 flex-shrink-0 mt-1">
                                ↗
                              </span>
                            </div>
                            
                            {/* Excerpt */}
                            {post.excerpt && (
                              <p className="text-[#FAF3E0]/70 text-base mb-4 line-clamp-2">
                                {post.excerpt}
                              </p>
                            )}
                            
                            {/* Tags */}
                            {Array.isArray(post.tags) && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {post.tags.map((tagItem: any, index: number) => (
                                  <span
                                    key={index}
                                    className="text-xs text-[#FAF3E0]/50 hover:text-[#FAF3E0]/70 transition-colors"
                                  >
                                    {tagItem.tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-[#FAF3E0]/60 font-serif text-lg mb-4">
                    {selectedTopics.length > 0 
                      ? 'no posts found with selected topics...' 
                      : 'no posts yet... stay tuned!'}
                  </p>
                </div>
              )}
            </div>

            {/* Topics Filter Sidebar */}
            {allTopics.length > 0 && (
              <aside className="lg:w-80 flex-shrink-0">
                <div className="lg:sticky lg:top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-[#FAF3E0] font-serif italic">
                      Choose topics
                    </h2>
                    {selectedTopics.length > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-[#FAF3E0]/60 hover:text-[#FAF3E0] transition-colors duration-300 underline"
                      >
                        clear all
                      </button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {allTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                          selectedTopics.includes(topic)
                            ? 'bg-[#FAF3E0] text-[#1A1A1A]'
                            : 'bg-[#FAF3E0]/10 text-[#FAF3E0]/70 hover:bg-[#FAF3E0]/20 hover:text-[#FAF3E0]'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                  
                  {selectedTopics.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#FAF3E0]/10">
                      <p className="text-xs text-[#FAF3E0]/50">
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
                      </p>
                    </div>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
