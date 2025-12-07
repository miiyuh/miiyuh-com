'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { Search } from 'lucide-react'
import type { BlogPostCard } from '@/types/blog'

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
  const [mounted, setMounted] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState<string[]>(selectedTags)
  const [searchInput, setSearchInput] = useState(searchQuery)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchParamsString = searchParams?.toString() ?? ''

  useEffect(() => {
    setMounted(true)
  }, [])

  const selectedTagsKey = useMemo(() => selectedTags.join('|'), [selectedTags])
  useEffect(() => {
    setSelectedTopics(selectedTags)
  }, [selectedTagsKey, selectedTags])

  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

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

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = searchInput.trim()
      if (trimmed === searchQuery.trim()) {
        return
      }
      updateRoute({ search: trimmed, page: 1 })
    }, 300)

    return () => clearTimeout(handler)
  }, [searchInput, searchQuery, updateRoute])

  const allTopics = useMemo(
    () => [...availableTags].sort((a, b) => a.label.localeCompare(b.label)),
    [availableTags]
  )

  const toggleTopic = (topicValue: string) => {
    const exists = selectedTopics.includes(topicValue)
    const next = exists
      ? selectedTopics.filter((t) => t !== topicValue)
      : [...selectedTopics, topicValue]
    setSelectedTopics(next)
    updateRoute({ tags: next, page: 1 })
  }

  const clearFilters = () => {
    setSelectedTopics([])
    setSearchInput('')
    updateRoute({ search: '', tags: [], page: 1 })
  }

  const handlePageChange = (page: number) => {
    if (page === pagination.page || page < 1 || page > pagination.totalPages) return
    updateRoute({ page })
  }

  const hasActiveFilters =
    selectedTopics.length > 0 || searchInput.trim().length > 0

  const getPostUrl = (post: BlogPostCard) => {
    if (!post.publishedAt) return `/blog/${post.slug}`
    const date = new Date(post.publishedAt)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `/blog/${year}/${month}/${post.slug}`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-GB', {
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
        className="relative grow px-6 md:px-12 lg:px-24 xl:px-32 min-h-[70vh]"
        style={{ paddingTop: '24px' }}
      >
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }} className="px-6 md:px-0">
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'blog' },
              ]}
              className="mb-0"
            />
          </div>

          <div className="mb-12 px-0 md:px-0">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-text-primary leading-tight">
              blog.
            </h1>
            <p className="text-base text-text-secondary max-w-xl leading-relaxed">
              thoughts, stories, and experiments archived in time.
            </p>
          </div>

          {/* Main Layout: CSS Grid - 4 columns (3 for posts, 1 for sidebar) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {/* Blog Posts - 3 columns on desktop, full width on mobile */}
            <div className="md:col-span-3 order-2 md:order-1 border-t border-white/10 md:border-b">
              {posts.length > 0 ? (
                <div className="flex flex-col divide-y divide-white/10">
                  {posts.map((post, index) => (
                    <ScrollAnimation
                      key={post.id}
                      animation="fadeUp"
                      delay={index * 0.03}
                      className="first:pt-0 last:pb-0"
                    >
                      <Link
                        href={getPostUrl(post)}
                        className="group block rounded-lg overflow-hidden transition-all duration-200 hover:opacity-80"
                      >
                        <div className="flex flex-col sm:flex-row">
                          {/* Cover Image - 4:3 aspect ratio */}
                          {post.coverImage?.url && (
                            <div className="relative w-full sm:w-40 md:w-48 shrink-0 aspect-4/3">
                              <Image
                                src={post.coverImage.url}
                                alt={post.coverImage.alt || post.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 192px"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0 p-5">
                            <div className="flex items-center gap-3 mb-2">
                              <time className="text-xs font-sans text-text-muted">
                                {post.publishedAt && formatDate(post.publishedAt)}
                              </time>
                              {post.tags && post.tags.length > 0 && (
                                <>
                                  {post.tags.slice(0, 2).map((tagItem, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="text-xs font-sans text-text-muted backdrop-blur-sm bg-white/10 px-2 py-0.5 rounded"
                                    >
                                      {tagItem?.tag}
                                    </span>
                                  ))}
                                </>
                              )}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-serif text-text-primary group-hover:text-accent-primary transition-colors duration-200 mb-2 leading-snug">
                              {post.title}
                            </h2>
                            <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </ScrollAnimation>
                  ))}
                </div>
              ) : (
                <div className="backdrop-blur-md bg-bg-primary/80 border border-white/10 rounded-lg py-20 text-center">
                  <p className="text-text-muted mb-4 text-lg font-serif">No posts found.</p>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-accent-primary hover:underline underline-offset-4"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {pagination.totalPages > 1 && (
                <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-3 py-1.5 text-sm rounded-md backdrop-blur-sm transition-colors duration-200 ${pagination.page === 1
                      ? 'text-text-muted/50 cursor-not-allowed'
                      : 'text-text-muted hover:text-text-primary bg-white/10 border border-white/15 hover:bg-white/15'
                      }`}
                  >
                    ←
                  </button>
                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      aria-current={pageNumber === pagination.page ? 'page' : undefined}
                      className={`w-8 h-8 text-sm rounded-md backdrop-blur-sm transition-colors duration-200 ${pageNumber === pagination.page
                        ? 'bg-accent-primary/30 text-accent-primary border border-accent-primary/40'
                        : 'text-text-muted bg-white/10 border border-white/15 hover:text-text-primary hover:bg-white/15'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className={`px-3 py-1.5 text-sm rounded-md backdrop-blur-sm transition-colors duration-200 ${pagination.page === pagination.totalPages
                      ? 'text-text-muted/50 cursor-not-allowed'
                      : 'text-text-muted hover:text-text-primary bg-white/10 border border-white/15 hover:bg-white/15'
                      }`}
                  >
                    →
                  </button>
                </nav>
              )}
            </div>

            {/* Sidebar - Search & Topics */}
            <aside className="md:col-span-1 order-1 md:order-2 md:border-l border-white/10">
              <div className="md:sticky md:top-24 space-y-6">
                {/* Combined Search & Topics Card */}
                <div className="border-t md:border-b border-white/10 rounded-lg p-0">
                  {/* Search Bar */}
                  <div className="relative mb-4 pr-px">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-text-muted" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search posts"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full font-sans bg-white/10 rounded-md py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:box-shadow-none transition-all duration-200"
                      style={{ boxShadow: 'none' }}
                    />
                  </div>

                  {/* Topic Tags */}
                  {allTopics.length > 0 && (
                    <>
                      <div className="flex items-center justify-between">
                        <label className="text-xl font-serif font-medium text-text-muted mb-2 block">
                          Topics
                        </label>
                      </div>
                      <div className={`flex md:flex-wrap gap-2 mb-4 transition-all duration-200`}>
                        <button
                          onClick={clearFilters}
                          className={`px-3 py-1.5 text-xs font-sans rounded-md transition-all duration-200 backdrop-blur-sm ${selectedTopics.length === 0
                            ? 'bg-accent-primary/30 text-accent-primary border border-accent-primary/40'
                            : 'bg-white/10 text-text-muted hover:text-text-secondary hover:bg-white/15'
                            }`}
                        >
                          all
                        </button>
                        {allTopics.map((topic) => (
                          <button
                            key={topic.value}
                            onClick={() => toggleTopic(topic.value)}
                                className={`px-3 py-1.5 text-xs font-sans rounded-md transition-all duration-200 backdrop-blur-sm ${selectedTopics.includes(topic.value)
                                  ? 'bg-accent-primary/30 text-accent-primary border border-accent-primary/40'
                                  : 'bg-white/10 text-text-muted hover:text-text-secondary hover:bg-white/15'
                                  }`}
                          >
                            {topic.label.toLowerCase()}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Results Info */}
                {hasActiveFilters && (
                  <div className="border-t md:border-b border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between text-xl">
                      <span className="font-serif font-medium text-text-muted">
                        {pagination.totalDocs} {pagination.totalDocs === 1 ? 'post' : 'posts'}
                      </span>
                      <button
                        onClick={clearFilters}
                        className="text-accent-primary hover:underline underline-offset-4 text-sm border-l pl-4 border-white/10"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
