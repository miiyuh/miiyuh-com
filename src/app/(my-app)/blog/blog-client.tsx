'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { Separator } from '@/components/ui/separator'
import { ArrowUpRight, Search, Tag, Calendar } from 'lucide-react'
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

  const resultLowerBound = pagination.totalDocs === 0
    ? 0
    : (pagination.page - 1) * pagination.pageSize + 1
  const resultUpperBound = pagination.totalDocs === 0
    ? 0
    : resultLowerBound + posts.length - 1

  const pageNumbers = useMemo(() => {
    return Array.from({ length: Math.max(pagination.totalPages, 1) }, (_, index) => index + 1)
  }, [pagination.totalPages])

  return (
    <main className="flex flex-col bg-bg-primary text-text-primary font-sans relative min-h-screen overflow-x-hidden">
      <section
        className="relative grow px-6 md:px-12 lg:px-24 xl:px-32 py-24 min-h-[70vh]"
        style={{ paddingTop: '24px' }}
      >
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'blog' },
              ]}
              className="mb-0"
            />
          </div>

          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-text-primary leading-[0.9]">
              the log.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              thoughts, stories, and experiments archived in time.
            </p>
          </div>

          <div className="sticky top-4 z-40 mb-6">
            <div className="glass-panel p-4 border border-white/10 backdrop-blur-xl bg-[#1A1A1A]/80">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-0">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 min-w-[260px]">
                  <span className="text-sm font-serif text-text-muted mr-2 shrink-0">Topics:</span>
                  <button
                    onClick={clearFilters}
                    className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 border shrink-0 ${selectedTopics.length === 0
                      ? 'bg-accent-primary text-bg-primary border-accent-primary'
                      : 'bg-transparent text-text-secondary border-white/10 hover:border-white/30 hover:text-text-primary'
                      }`}
                    aria-pressed={selectedTopics.length === 0}
                  >
                    All
                  </button>
                  {allTopics.map((topic) => (
                    <button
                      key={topic.value}
                      onClick={() => toggleTopic(topic.value)}
                      className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 border shrink-0 ${selectedTopics.includes(topic.value)
                        ? 'bg-accent-primary text-bg-primary border-accent-primary'
                        : 'bg-transparent text-text-secondary border-white/10 hover:border-white/30 hover:text-text-primary'
                        }`}
                      aria-pressed={selectedTopics.includes(topic.value)}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-2 w-full lg:flex-row lg:items-center lg:justify-end lg:gap-4 lg:flex-1">
                  <div className="relative w-full max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-3.5 w-3.5 text-text-muted" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 py-2 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/50 focus:bg-white/10 transition-all duration-300 rounded-none"
                    />
                  </div>

                  <div className="text-sm text-text-muted text-center lg:text-right whitespace-nowrap flex items-center justify-end">
                    <span>
                      {pagination.totalDocs > 0
                        ? `Showing ${resultLowerBound}–${resultUpperBound} of ${pagination.totalDocs} entries`
                        : 'No posts available'}
                    </span>
                    {hasActiveFilters && (
                      <>
                        <Separator orientation="vertical" className="h-6 bg-white/10 mx-4" />
                        <button
                          onClick={clearFilters}
                          className="underline-offset-4 hover:underline text-text-primary"
                        >
                          Clear filters
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <ScrollAnimation
                  key={post.id}
                  animation="fadeUp"
                  delay={index * 0.05}
                >
                  <Link href={getPostUrl(post)} className="group block h-full">
                    <article className="flex flex-col h-full border border-white/10 bg-[#121212]/90 backdrop-blur-md hover:border-accent-primary/50 transition-all duration-500 group-hover:-translate-y-1">
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
                      {post.coverImage?.caption && (
                        <p className="mt-2 text-left text-sm text-text-secondary font-mono" style={{ fontFamily: "'Noto Sans Mono', monospace" }}>
                          {post.coverImage.caption}
                        </p>
                      )}
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

          {pagination.totalPages > 1 && (
            <nav className="mt-12 flex flex-wrap items-center justify-center gap-2 text-sm" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`px-3 py-1.5 border border-white/10 transition-all duration-300 ${pagination.page === 1
                  ? 'text-text-muted cursor-not-allowed'
                  : 'hover:border-accent-primary/60 hover:text-text-primary'
                  }`}
              >
                Prev
              </button>
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  aria-current={pageNumber === pagination.page ? 'page' : undefined}
                  className={`px-3 py-1.5 border transition-all duration-300 ${pageNumber === pagination.page
                    ? 'bg-accent-primary text-bg-primary border-accent-primary'
                    : 'border-white/10 text-text-secondary hover:border-white/30 hover:text-text-primary'
                    }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className={`px-3 py-1.5 border border-white/10 transition-all duration-300 ${pagination.page === pagination.totalPages
                  ? 'text-text-muted cursor-not-allowed'
                  : 'hover:border-accent-primary/60 hover:text-text-primary'
                  }`}
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </section>
    </main>
  )
}
