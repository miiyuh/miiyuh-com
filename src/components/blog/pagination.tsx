'use client'

import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemsPerPage: number
  totalItems: number
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems
}) => {
  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getPageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    // Calculate range
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Results info */}
      <div className="text-sm text-[#FAF3E0]/60">
        Showing {startItem}-{endItem} of {totalItems} posts
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
            currentPage === 1
              ? 'text-[#FAF3E0]/30 cursor-not-allowed'
              : 'text-[#FAF3E0]/60 hover:text-[#FAF3E0] hover:bg-[#FAF3E0]/10'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((pageNumber, index) => (
            <React.Fragment key={index}>
              {pageNumber === '...' ? (
                <span className="px-3 py-2 text-[#FAF3E0]/40">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(pageNumber as number)}
                  className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                    currentPage === pageNumber
                      ? 'bg-[#FAF3E0]/20 text-[#FAF3E0] border border-[#FAF3E0]/30'
                      : 'text-[#FAF3E0]/60 hover:text-[#FAF3E0] hover:bg-[#FAF3E0]/10'
                  }`}
                >
                  {pageNumber}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
            currentPage === totalPages
              ? 'text-[#FAF3E0]/30 cursor-not-allowed'
              : 'text-[#FAF3E0]/60 hover:text-[#FAF3E0] hover:bg-[#FAF3E0]/10'
          }`}
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
