'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { ArrowUpRight, Search, Tag, Calendar } from 'lucide-react'
import type { BlogPostCard } from '@/types/blog'

interface BlogClientProps {
  posts: BlogPostCard[]
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

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

  // Filter posts based on selected topics and search query
  const filteredPosts = posts.filter((post) => {
    const matchesTopics = selectedTopics.length === 0 ||
      post.tags?.some((tagItem) => selectedTopics.includes(tagItem.tag))

    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTopics && matchesSearch
  })

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
    setSearchQuery('')
  }

  // Helper function to generate blog post URL
  const getPostUrl = (post: BlogPostCard) => {
    if (!post.publishedAt) return `/blog/${post.slug}`
    const date = new Date(post.publishedAt)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `/blog/${year}/${month}/${post.slug}`
  }

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <main className="flex flex-col bg-bg-primary text-text-primary font-sans relative min-h-screen overflow-x-hidden">


      <section className="relative grow px-6 md:px-12 lg:px-24 xl:px-32 py-24">
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Breadcrumb Navigation */}
          <SimpleBreadcrumb
            items={[
              { label: 'home', href: '/' },
              { label: 'blog' },
            ]}
            className="mb-16"
          />

          {/* Header Section */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-text-primary leading-[0.9]">
              the log.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              thoughts, stories, and experiments archived in time.
            </p>
          </div>

          {/* Sticky Filter Bar */}
          <div className="sticky top-4 z-40 mb-12">
            <div className="glass-panel p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10 backdrop-blur-xl bg-[#1A1A1A]/80">

              {/* Topics */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                <span className="text-sm font-serif text-text-muted mr-2 shrink-0">Topics:</span>
                <button
                  onClick={clearFilters}
                  className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 border shrink-0 ${selectedTopics.length === 0
                    ? 'bg-accent-primary text-bg-primary border-accent-primary'
                    : 'bg-transparent text-text-secondary border-white/10 hover:border-white/30 hover:text-text-primary'
                    }`}
                >
                  All
                </button>
                {allTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 border shrink-0 ${selectedTopics.includes(topic)
                      ? 'bg-accent-primary text-bg-primary border-accent-primary'
                      : 'bg-transparent text-text-secondary border-white/10 hover:border-white/30 hover:text-text-primary'
                      }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-64 shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-3.5 w-3.5 text-text-muted" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 py-2 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/50 focus:bg-white/10 transition-all duration-300 rounded-none"
                />
              </div>
            </div>
          </div>

          {/* Main Content - Post Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <ScrollAnimation
                  key={post.id}
                  animation="fadeUp"
                  delay={index * 0.05}
                >
                  <Link href={getPostUrl(post)} className="group block h-full">
                    <article className="flex flex-col h-full border border-white/10 bg-[#121212]/90 backdrop-blur-md hover:border-accent-primary/50 transition-all duration-500 group-hover:-translate-y-1">

                      {/* Image */}
                      {post.coverImage?.url && (
                        <div className="w-full aspect-4/3 relative overflow-hidden border-b border-white/10">
                          <Image
                            src={post.coverImage.url}
                            alt={post.coverImage.alt || post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>
                      )}
                      {/* Caption */}
                      {post.coverImage?.caption && (
                        <p className="mt-2 text-left text-sm text-text-secondary font-mono" style={{ fontFamily: "'Noto Sans Mono', monospace" }}>
                          {post.coverImage.caption}
                        </p>
                      )}

                      {/* Content */}
                      <div className="p-6 flex flex-col grow">
                        <div className="flex items-center gap-3 text-xs text-text-muted mb-4 font-mono uppercase tracking-wider">
                          {post.publishedAt && (
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.publishedAt)}
                            </span>
                          )}
                          {post.tags && post.tags.length > 0 && (
                            <span className="flex items-center gap-1.5">
                              <Tag className="w-3 h-3" />
                              {post.tags[0].tag}
                            </span>
                          )}
                        </div>

                        <h2 className="text-2xl font-serif font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors leading-tight">
                          {post.title}
                        </h2>

                        <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3 grow">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-primary group-hover:text-accent-primary transition-colors mt-auto pt-4 border-t border-white/5">
                          Read Article
                          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center border border-white/10 bg-white/5">
              <div className="text-6xl mb-6 opacity-50">🔍</div>
              <h3 className="text-3xl font-serif text-text-primary mb-3">No posts found</h3>
              <p className="text-text-secondary mb-8">Try adjusting your search or filters.</p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 bg-white/10 hover:bg-accent-primary hover:text-bg-primary text-text-primary border border-white/10 transition-all duration-300 uppercase tracking-wider text-sm font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </section>
    </main>
  )
}
