'use client'

import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

interface BlogFiltersProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string | null) => void
  onSort: (sort: 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc') => void
  categories: string[]
  currentCategory: string | null
  currentSort: string
  searchQuery: string
}

export const BlogFilters: React.FC<BlogFiltersProps> = ({
  onSearch,
  onCategoryFilter,
  onSort,
  categories = [],
  currentCategory,
  currentSort,
  searchQuery: initialSearchQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    onSearch(debouncedSearchQuery)
  }, [debouncedSearchQuery, onSearch])

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      onCategoryFilter(null)
    } else {
      onCategoryFilter(category)
    }
  }

  const handleSortChange = (sort: string) => {
    onSort(sort as 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc')
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-[#FAF3E0]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#FAF3E0]/5 border border-[#FAF3E0]/20 rounded-lg text-[#FAF3E0] placeholder-[#FAF3E0]/40 focus:outline-none focus:ring-2 focus:ring-[#FAF3E0]/30 focus:border-transparent transition-all duration-300"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#FAF3E0]/40 hover:text-[#FAF3E0] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${
              !currentCategory
                ? 'bg-[#FAF3E0]/20 text-[#FAF3E0] border-[#FAF3E0]/40'
                : 'bg-[#FAF3E0]/5 text-[#FAF3E0]/60 border-[#FAF3E0]/20 hover:bg-[#FAF3E0]/10 hover:border-[#FAF3E0]/30'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 capitalize ${
                currentCategory === category
                  ? 'bg-[#FAF3E0]/20 text-[#FAF3E0] border-[#FAF3E0]/40'
                  : 'bg-[#FAF3E0]/5 text-[#FAF3E0]/60 border-[#FAF3E0]/20 hover:bg-[#FAF3E0]/10 hover:border-[#FAF3E0]/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="appearance-none bg-[#FAF3E0]/10 border border-[#FAF3E0]/30 rounded-lg px-4 py-2 pr-10 text-[#FAF3E0] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FAF3E0]/50 focus:border-[#FAF3E0]/60 focus:bg-[#FAF3E0]/20 hover:bg-[#FAF3E0]/15 hover:border-[#FAF3E0]/40 transition-all duration-300 cursor-pointer shadow-sm"
            style={{ 
              colorScheme: 'dark',
              color: '#FAF3E0',
              backgroundColor: 'rgba(250, 243, 224, 0.1)'
            }}
          >
            <option value="date-desc" style={{ backgroundColor: '#1A1A1A', color: '#FAF3E0' }}>Newest First</option>
            <option value="date-asc" style={{ backgroundColor: '#1A1A1A', color: '#FAF3E0' }}>Oldest First</option>
            <option value="title-asc" style={{ backgroundColor: '#1A1A1A', color: '#FAF3E0' }}>Title A-Z</option>
            <option value="title-desc" style={{ backgroundColor: '#1A1A1A', color: '#FAF3E0' }}>Title Z-A</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-[#FAF3E0]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(currentCategory || searchQuery) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-[#FAF3E0]/60">Active filters:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FAF3E0]/10 text-[#FAF3E0]/80 text-xs rounded-full">
              Search: &ldquo;{searchQuery}&rdquo;
              <button
                onClick={() => setSearchQuery('')}
                className="ml-1 text-[#FAF3E0]/60 hover:text-[#FAF3E0] transition-colors"
              >
                ×
              </button>
            </span>
          )}
          {currentCategory && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FAF3E0]/10 text-[#FAF3E0]/80 text-xs rounded-full capitalize">
              Category: {currentCategory}
              <button
                onClick={() => onCategoryFilter(null)}
                className="ml-1 text-[#FAF3E0]/60 hover:text-[#FAF3E0] transition-colors"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
