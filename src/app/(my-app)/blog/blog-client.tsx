'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { Search } from 'lucide-react'
import type { BlogPostCard } from '@/types/blog'
import { resolveMediaSrc } from '@/utils/media'
import { useWebHaptics } from 'web-haptics/react'

interface TagOption {
  value: string
  label: string
}

interface BlogClientProps {
  posts: BlogPostCard[]
  availableTags: TagOption[]
  selectedTags: string[]
  searchQuery: string
  pagination: {
    page: number
    totalPages: number
    totalDocs: number
    pageSize: number
  }
}

export default function BlogClient({
  posts,
  availableTags,
  selectedTags,
  searchQuery,
  pagination,
}: BlogClientProps) {
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const haptic = useWebHaptics()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchParamsString = searchParams?.toString() ?? ''

  const updateRoute = useCallback(
    (updates: { search?: string; tags?: string[]; page?: number }) => {
      const params = new URLSearchParams(searchParamsString)

      if (updates.search !== undefined) {
        const trimmed = updates.search.trim()
        if (trimmed) {
          params.set('search', trimmed)
        } else {
          params.delete('search')
        }
      }

      if (updates.tags !== undefined) {
        params.delete('tag')
        updates.tags.forEach((tag) => {
          if (tag.trim()) {
            params.append('tag', tag)
          }
        })
      }

      if (updates.page !== undefined) {
        if (updates.page > 1) {
          params.set('page', String(updates.page))
        } else {
          params.delete('page')
        }
      }

      const queryString = params.toString()
      const target = queryString ? `${pathname}?${queryString}` : pathname

      router.replace(target, { scroll: false })
    },
    [pathname, router, searchParamsString]
  )

  const handleSearchInputChange = useCallback(
    (value: string) => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current)
      }

      searchDebounceRef.current = setTimeout(() => {
        const trimmed = value.trim()
        if (trimmed === searchQuery.trim()) {
          return
        }
        updateRoute({ search: trimmed, page: 1 })
      }, 300)
    },
    [searchQuery, updateRoute]
  )

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current)
      }
    }
  }, [])

  const allTopics = useMemo(
    () => [...availableTags].sort((a, b) => a.label.localeCompare(b.label)),
    [availableTags]
  )

  const toggleTopic = (topicValue: string) => {
    haptic.trigger('selection')
    const exists = selectedTags.includes(topicValue)
    const next = exists
      ? selectedTags.filter((t) => t !== topicValue)
      : [...selectedTags, topicValue]
    updateRoute({ tags: next, page: 1 })
  }

  const clearFilters = () => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current)
    }
    if (searchInputRef.current) {
      searchInputRef.current.value = ''
    }
    updateRoute({ search: '', tags: [], page: 1 })
  }

  const handlePageChange = (page: number) => {
    if (page === pagination.page || page < 1 || page > pagination.totalPages) return
    haptic.trigger('selection')
    updateRoute({ page })
  }

  const getPostUrl = (post: BlogPostCard) => {
    if (!post.publishedAt) return `/blog/${post.slug}`
    const [year, month] = new Date(post.publishedAt)
      .toLocaleDateString('en-CA', { timeZone: 'Asia/Kuala_Lumpur' })
      .split('-')
    return `/blog/${year}/${month}/${post.slug}`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-GB', {
      timeZone: 'Asia/Kuala_Lumpur',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const pageNumbers = useMemo(() => {
    return Array.from({ length: Math.max(pagination.totalPages, 1) }, (_, index) => index + 1)
  }, [pagination.totalPages])

  return (
    <main className="flex flex-col bg-bg-primary text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section
        className="relative grow px-8 md:px-32 lg:px-56 xl:px-80 min-h-[70vh]"
        style={{ paddingTop: '24px' }}
      >
        <div>
          <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'blog' },
              ]}
              className="mb-0"
            />
          </div>

          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-text-primary text-balance">
              blog
            </h1>
            <p className="text-lg md:text-xl text-text-secondary text-pretty">
              little thoughts, big ideas, lofty dreams, all sorts!
            </p>
          </div>

          {/* Filter Bar - Search & Topics */}
          <div className="border-t border-white/8 pt-8 pb-8">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-text-muted" />
                </div>
                <input
                  key={searchQuery}
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search posts"
                  defaultValue={searchQuery}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  className="w-full font-sans bg-white/2 border border-white/8 rounded-lg py-2.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-white/15 transition-all duration-200"
                />
              </div>

              {/* Topic Tags */}
              {allTopics.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-text-muted/60 font-light">
                    Topics
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => { haptic.trigger('selection'); clearFilters() }}
                      className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 ${selectedTags.length === 0
                        ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                        : 'bg-white/4 text-text-muted hover:text-text-secondary hover:bg-white/6'
                        }`}
                    >
                      all
                    </button>
                    {allTopics.map((topic) => (
                      <button
                        key={topic.value}
                        onClick={() => toggleTopic(topic.value)}
                        className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 ${selectedTags.includes(topic.value)
                          ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                          : 'bg-white/4 text-text-muted hover:text-text-secondary hover:bg-white/6'
                          }`}
                      >
                        {topic.label.toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Blog Posts List */}
          <div>
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => {
                  const coverSrc = resolveMediaSrc({
                    url: post.coverImage?.url,
                  })

                  return (
                    <Link
                      key={post.id}
                      href={getPostUrl(post)}
                      className="group block content-auto-sm"
                      onClick={() => haptic.trigger('medium')}
                    >
                      <div className="flex flex-col sm:flex-row gap-5 p-5 rounded-lg border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/12 transition-all duration-300">
                        {/* Cover Image */}
                        {coverSrc && (
                          <div className="relative w-full sm:w-48 shrink-0 aspect-video rounded-md overflow-hidden">
                            <Image
                              src={coverSrc}
                              alt={post.coverImage?.alt || post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, 192px"
                              quality={75}
                              loading="lazy"
                            />
                          </div>
                        )}
                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <time className="text-xs text-text-muted/60">
                                {post.publishedAt && formatDate(post.publishedAt)}
                              </time>
                              {post.tags && post.tags.length > 0 && (
                                <>
                                  {post.tags.slice(0, 2).map((tagItem, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="text-[11px] text-text-muted/50 rounded-full bg-white/4 px-2 py-0.5"
                                    >
                                      {tagItem?.tag}
                                    </span>
                                  ))}
                                </>
                              )}
                            </div>
                            <h2 className="text-lg font-medium text-text-primary group-hover:text-accent-primary transition-colors duration-200 mb-2">
                              {post.title}
                            </h2>
                            <p className="text-sm text-text-secondary/70 line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="border border-white/8 rounded-lg py-20 text-center">
                <p className="text-text-muted mb-4">No posts found.</p>
                <button
                  onClick={() => { haptic.trigger('light'); clearFilters() }}
                  className="text-sm text-accent-primary hover:underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {pagination.totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 ${pagination.page === 1
                    ? 'text-text-muted/40 cursor-not-allowed'
                    : 'text-text-muted hover:text-text-primary bg-white/4 border border-white/8 hover:bg-white/6'
                    }`}
                >
                  ←
                </button>
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    aria-current={pageNumber === pagination.page ? 'page' : undefined}
                    className={`w-8 h-8 text-sm rounded-lg transition-colors duration-200 ${pageNumber === pagination.page
                      ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                      : 'text-text-muted bg-white/4 border border-white/8 hover:text-text-primary hover:bg-white/6'
                      }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-200 ${pagination.page === pagination.totalPages
                    ? 'text-text-muted/40 cursor-not-allowed'
                    : 'text-text-muted hover:text-text-primary bg-white/4 border border-white/8 hover:bg-white/6'
                    }`}
                >
                  →
                </button>
              </nav>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
