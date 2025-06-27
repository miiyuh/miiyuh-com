'use client'

import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'
import { BlogCard } from '@/components/blog/blog-card'
import { BlogFilters } from '@/components/blog/blog-filters'
import { Pagination } from '@/components/blog/pagination'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: Record<string, unknown> // Rich text content from PayloadCMS
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

interface BlogResponse {
  success: boolean
  data: BlogPost[]
  error?: string
}

export default function BlogPage() {
  const [mounted, setMounted] = useState(false)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter and pagination state
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'>('date-desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [layout, setLayout] = useState<'card' | 'list'>('card')
  const itemsPerPage = 6

  useEffect(() => {
    setMounted(true)
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      const data: BlogResponse = await response.json()
      
      if (data.success) {
        setPosts(data.data)
      } else {
        setError(data.error || 'Failed to load blog posts')
      }
    } catch (err) {
      setError('Failed to fetch blog posts')
      console.error('Error fetching blog posts:', err)
    } finally {
      setLoading(false)
    }
  }

  // Get unique categories
  const categories = useMemo(() => {
    const allCategories = posts.flatMap(post => 
      post.categories?.map(cat => cat.category) || []
    )
    return [...new Set(allCategories)]
  }, [posts])

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...posts]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.categories?.some(cat => cat.category.toLowerCase().includes(query)) ||
        post.tags?.some(tag => tag.tag.toLowerCase().includes(query))
      )
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(post =>
        post.categories?.some(cat => cat.category === categoryFilter)
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        case 'date-asc':
          return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return filtered
  }, [posts, searchQuery, categoryFilter, sortBy])

  // Get featured post
  const featuredPost = posts.find(post => post.featured) || posts[0]

  // Paginate posts
  const totalPages = Math.ceil(filteredAndSortedPosts.length / itemsPerPage)
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, categoryFilter, sortBy])

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">
      {/* Interactive dots background */}
      <InteractiveDotsBackground />
      
      {/* Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-screen">
        
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Breadcrumb Navigation */}
          <nav className="w-full mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-[#FAF3E0]/60">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                >
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

          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-5xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
                  blog 📰
                </h1>
                
                {/* Decorative line */}
                <div className="w-24 h-0.5 bg-[#FAF3E0]/30 mb-6"></div>
              </div>

              {/* Layout Toggle */}
              <div className="flex items-center gap-2 bg-[#FAF3E0]/5 rounded-lg p-1">
                <button
                  onClick={() => setLayout('card')}
                  className={`p-2 rounded transition-all duration-200 ${
                    layout === 'card' 
                      ? 'bg-[#FAF3E0]/20 text-[#FAF3E0]' 
                      : 'text-[#FAF3E0]/60 hover:text-[#FAF3E0]'
                  }`}
                  title="Card view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={`p-2 rounded transition-all duration-200 ${
                    layout === 'list' 
                      ? 'bg-[#FAF3E0]/20 text-[#FAF3E0]' 
                      : 'text-[#FAF3E0]/60 hover:text-[#FAF3E0]'
                  }`}
                  title="List view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
              thoughts, tutorials, and digital wanderings ✍️
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && !searchQuery && !categoryFilter && currentPage === 1 && (
            <BlogCard 
              post={featuredPost} 
              featured={true} 
              showImage={true}
            />
          )}

          {/* Filters */}
          <BlogFilters
            onSearch={setSearchQuery}
            onCategoryFilter={setCategoryFilter}
            onSort={setSortBy}
            categories={categories}
            currentCategory={categoryFilter}
            currentSort={sortBy}
            searchQuery={searchQuery}
          />

          {/* Blog Posts Content */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FAF3E0]"></div>
              <span className="ml-3 text-[#FAF3E0]/60">Loading posts...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-red-400 mb-4">⚠️ {error}</div>
              <p className="text-[#FAF3E0]/60 mb-6">
                Don&apos;t worry! You can create your first blog post in the{' '}
                <Link href="/admin" className="underline hover:text-[#FAF3E0] transition-colors">
                  admin panel
                </Link>
              </p>
              <button 
                onClick={fetchBlogPosts}
                className="px-4 py-2 bg-[#FAF3E0]/10 border border-[#FAF3E0]/20 rounded-lg hover:bg-[#FAF3E0]/20 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredAndSortedPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🔍</div>
              <h2 className="text-2xl font-bold mb-4">No Posts Found</h2>
              <p className="text-[#FAF3E0]/60 mb-6">
                {searchQuery || categoryFilter 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Ready to share your first story? Create a new blog post in the admin panel.'
                }
              </p>
              {(searchQuery || categoryFilter) && (
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setCategoryFilter(null)
                  }}
                  className="px-4 py-2 bg-[#FAF3E0]/10 border border-[#FAF3E0]/20 rounded-lg hover:bg-[#FAF3E0]/20 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Posts Grid/List */}
              <div className={
                layout === 'card' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-4'
              }>
                {paginatedPosts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    layout={layout}
                    showImage={true}
                    index={index}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredAndSortedPosts.length}
              />
            </>
          )}
        </div>

        {/* Fun interactive element */}
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
          <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
            {filteredAndSortedPosts.length > 0 
              ? `${filteredAndSortedPosts.length} post${filteredAndSortedPosts.length !== 1 ? 's' : ''} found` 
              : 'words & wanderings'
            } ✍️
          </p>
        </div>
      </section>
    </main>
  )
}
