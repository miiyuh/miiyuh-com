'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Web Vitals tracking
export const useWebVitals = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Track Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          switch (entry.entryType) {
            case 'largest-contentful-paint':
              console.log('LCP:', entry.startTime)
              break
            case 'first-input':
              console.log('FID:', entry.processingStart - entry.startTime)
              break
            case 'layout-shift':
              if (!(entry as any).hadRecentInput) {
                console.log('CLS:', (entry as any).value)
              }
              break
          }
        })
      })

      // Observe different entry types
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
      } catch (e) {
        // Fallback for browsers that don't support all entry types
        console.log('Performance observation not fully supported')
      }

      return () => observer.disconnect()
    }
  }, [])
}

// Page view tracking
export const usePageTracking = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    
    // Track page view
    if (typeof window !== 'undefined') {
      // Custom analytics (replace with your preferred analytics service)
      console.log('Page view:', url)
      
      // Track page load time
      const startTime = performance.now()
      const handleLoad = () => {
        const loadTime = performance.now() - startTime
        console.log(`Page load time for ${url}:`, loadTime, 'ms')
      }
      
      if (document.readyState === 'complete') {
        handleLoad()
      } else {
        window.addEventListener('load', handleLoad)
        return () => window.removeEventListener('load', handleLoad)
      }
    }
  }, [pathname, searchParams])
}

// Error tracking
export const useErrorTracking = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      })
      
      // Send to error tracking service
      // reportError(event.error)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      
      // Send to error tracking service
      // reportError(event.reason)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])
}

// User interaction tracking
export const useInteractionTracking = () => {
  useEffect(() => {
    const trackClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const tagName = target.tagName.toLowerCase()
      const href = target.getAttribute('href')
      const text = target.textContent?.slice(0, 50)

      if (tagName === 'a' || target.closest('a')) {
        console.log('Link click:', { href, text })
      } else if (tagName === 'button' || target.closest('button')) {
        console.log('Button click:', { text })
      }
    }

    const trackScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      // Track scroll depth milestones
      if (scrollPercentage % 25 === 0 && scrollPercentage > 0) {
        console.log('Scroll depth:', scrollPercentage + '%')
      }
    }

    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(trackScroll, 100)
    }

    document.addEventListener('click', trackClick)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('click', trackClick)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])
}

// Performance monitoring component
export const PerformanceMonitor = () => {
  useWebVitals()
  usePageTracking()
  useErrorTracking()
  useInteractionTracking()

  return null
}

// Site speed optimization detector
export const useSiteSpeedOptimization = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check connection quality
      const connection = (navigator as any).connection
      if (connection) {
        console.log('Connection info:', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        })
        
        // Adjust quality based on connection
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          document.documentElement.classList.add('low-bandwidth')
        }
      }

      // Memory usage monitoring
      if ('memory' in performance) {
        const memory = (performance as any).memory
        console.log('Memory usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
        })
      }

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (prefersReducedMotion.matches) {
        document.documentElement.classList.add('reduce-motion')
      }
    }
  }, [])
}
