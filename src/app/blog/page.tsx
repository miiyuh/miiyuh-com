'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sanity, queries, urlFor, type BlogPost, type Category } from '../../../lib/sanity'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [postsData, categoriesData] = await Promise.all([
          sanity.fetch(queries.allPosts),
          sanity.fetch(queries.allCategories)
        ])
        setPosts(postsData)
        setCategories(categoriesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching blog data:', err)
        setError('Failed to load blog posts. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category?.slug?.current === selectedCategory)
    : posts

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
            <p className="text-[#FAF3E0]/70">Loading blog posts...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative min-h-screen">
        <div className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter mb-6">
              my blog
            </h1>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative min-h-screen">
      <div className="flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter mb-6">
              my blog
            </h1>
            <p className="text-lg text-[#FAF3E0]/70 max-w-2xl mx-auto">
              thoughts about attack on titan, photography, coding, and life
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === null
                    ? 'bg-[#FAF3E0] text-[#1A1A1A]'
                    : 'bg-[#252525] text-[#FAF3E0]/70 hover:bg-[#303030] hover:text-[#FAF3E0]'
                }`}
              >
                all posts
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category.slug.current)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.slug.current
                      ? 'bg-[#FAF3E0] text-[#1A1A1A]'
                      : 'bg-[#252525] text-[#FAF3E0]/70 hover:bg-[#303030] hover:text-[#FAF3E0]'
                  }`}
                  style={selectedCategory === category.slug.current && category.color ? {
                    backgroundColor: category.color,
                    color: '#1A1A1A'
                  } : {}}
                >
                  {category.title.toLowerCase()}
                </button>
              ))}
            </div>
          )}

          {/* Blog Posts */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-[#252525] rounded-lg p-8 border border-[#FAF3E0]/10 max-w-md mx-auto">
                <p className="text-[#FAF3E0]/60 mb-4">
                  {selectedCategory ? 'No posts in this category yet.' : 'No blog posts yet.'}
                </p>
                <p className="text-[#FAF3E0]/40 text-sm">
                  Check back soon for new content!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (                <article
                  key={post._id}
                  className="bg-[#252525] rounded-lg overflow-hidden border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <Link href={`/blog/${post.slug.current}`}>
                    {post.coverImage && (
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={urlFor(post.coverImage).width(400).height(225).url()}
                          alt={post.coverImage.alt || post.title}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      {/* Category and Date */}
                      <div className="flex items-center justify-between mb-3">
                        {post.category && (
                          <span 
                            className="text-xs font-medium px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: post.category.color || '#FAF3E0',
                              color: '#1A1A1A'
                            }}
                          >
                            {post.category.title}
                          </span>
                        )}
                        <time className="text-xs text-[#FAF3E0]/50">
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold mb-3 lowercase tracking-tight leading-tight hover:text-[#FAF3E0]/80 transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-[#FAF3E0]/70 text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Tags and Read Time */}
                      <div className="flex items-center justify-between">
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag: { _id: string; title: string }) => (
                              <span
                                key={tag._id}
                                className="text-xs text-[#FAF3E0]/50 bg-[#1A1A1A] px-2 py-1 rounded"
                              >
                                #{tag.title}
                              </span>
                            ))}
                          </div>
                        )}
                        {post.readTime && (
                          <span className="text-xs text-[#FAF3E0]/50">
                            {post.readTime} min read
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
