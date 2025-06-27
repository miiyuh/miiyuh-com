'use client'

import { useState, useEffect } from 'react'

interface ReadingProgressProps {
  target?: string // CSS selector for the content container
  className?: string
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({ 
  target = 'article', 
  className = '' 
}) => {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const calculateProgress = () => {
      const element = document.querySelector(target)
      if (!element) return

      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + window.pageYOffset
      const elementHeight = rect.height
      const windowHeight = window.innerHeight
      const scrollTop = window.pageYOffset
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - windowHeight

      // Show progress when article starts coming into view
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setVisible(true)
        
        // Method 1: Check if we're at the bottom of the page
        if (scrollTop >= maxScroll - 5) { // 5px tolerance
          setProgress(100)
          return
        }
        
        // Method 2: Calculate based on article position
        const articleStart = elementTop
        const scrollBottom = scrollTop + windowHeight
        
        if (scrollBottom <= articleStart) {
          setProgress(0)
        } else {
          // Calculate what percentage of the article content has passed through the viewport
          const totalReadableHeight = elementHeight - windowHeight
          
          if (totalReadableHeight <= 0) {
            // Article is shorter than viewport
            setProgress(100)
          } else {
            const scrolledIntoArticle = Math.max(0, scrollTop - articleStart)
            const progressPercentage = Math.min((scrolledIntoArticle / totalReadableHeight) * 100, 100)
            setProgress(progressPercentage)
          }
        }
      } else {
        setVisible(false)
        setProgress(0)
      }
    }

    // Initial calculation
    calculateProgress()

    // Update on scroll
    const handleScroll = () => {
      requestAnimationFrame(calculateProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', calculateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateProgress)
    }
  }, [target])

  return (
    <>
      {/* Fixed progress bar at top */}
      <div 
        className={`fixed top-0 left-0 right-0 h-1 bg-[#FAF3E0]/20 z-50 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      >
        <div 
          className="h-full bg-gradient-to-r from-[#FAF3E0] to-[#FAF3E0]/80 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Circular progress indicator */}
      <div 
        className={`fixed bottom-24 left-8 z-50 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative w-14 h-14 group">
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-[#1A1A1A] text-[#FAF3E0] text-xs rounded-lg border border-[#FAF3E0]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            Reading Progress
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1A1A1A]"></div>
          </div>
          
          {/* Background circle with subtle glow */}
          <div className="absolute inset-0 bg-[#FAF3E0]/10 rounded-full backdrop-blur-sm border border-[#FAF3E0]/20 group-hover:bg-[#FAF3E0]/20 transition-colors duration-300"></div>
          
          <svg 
            className="w-14 h-14 transform -rotate-90" 
            viewBox="0 0 36 36"
          >
            <path
              className="stroke-[#FAF3E0]/20"
              strokeWidth="2.5"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Progress circle */}
            <path
              className={`transition-all duration-500 ease-out drop-shadow-sm ${
                progress >= 100 ? 'stroke-green-400' : 'stroke-[#FAF3E0]'
              }`}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${progress}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xs font-semibold transition-all duration-300 ${
              progress >= 100 
                ? 'text-green-400 scale-110' 
                : 'text-[#FAF3E0] group-hover:scale-110'
            }`}>
              {progress >= 100 ? '✓' : `${Math.round(progress)}%`}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
