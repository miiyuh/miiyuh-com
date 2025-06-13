// Image optimization configurations
export const imageConfig = {
  formats: ['image/webp', 'image/avif'],
  quality: [75, 85, 95],
  sizes: {
    thumbnail: { width: 150, height: 150 },
    small: { width: 400, height: 300 },
    medium: { width: 800, height: 600 },
    large: { width: 1200, height: 900 },
    xl: { width: 1920, height: 1080 }
  }
}

// Critical resource preloading
export const preloadResources = () => {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontLink = document.createElement('link')
    fontLink.rel = 'preload'
    fontLink.href = 'https://rsms.me/inter/inter.css'
    fontLink.as = 'style'
    document.head.appendChild(fontLink)

    // Preload critical images
    const logoImage = new Image()
    logoImage.src = '/assets/img/logo_miiyuh_text_white_v2.png'
  }
}

// Lazy loading observer
export const createLazyLoadObserver = (callback: IntersectionObserverCallback) => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    return new IntersectionObserver(callback, {
      rootMargin: '50px 0px',
      threshold: 0.01
    })
  }
  return null
}

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('SW registered: ', registration)
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError)
    }
  }
}

// Resource hints for better loading
export const addResourceHints = () => {
  if (typeof document !== 'undefined') {
    // DNS prefetch for external domains
    const dnsPrefetch = [
      'https://vercel.com',
      'https://fonts.googleapis.com',
      'https://rsms.me'
    ]

    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = domain
      document.head.appendChild(link)
    })

    // Preconnect to critical domains
    const preconnect = [
      'https://rsms.me',
      'https://fonts.gstatic.com'
    ]

    preconnect.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
  }
}

// Performance monitoring
export const measurePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const metrics = {
          // Core Web Vitals
          FCP: 0, // First Contentful Paint
          LCP: 0, // Largest Contentful Paint
          FID: 0, // First Input Delay
          CLS: 0, // Cumulative Layout Shift
          
          // Loading performance
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          ttfb: perfData.responseStart - perfData.requestStart, // Time to First Byte
          domInteractive: perfData.domInteractive
        }

        // Log metrics for development
        if (process.env.NODE_ENV === 'development') {
          console.table(metrics)
        }

        return metrics
      }, 0)
    })
  }
}

// Memory optimization
export const optimizeMemory = () => {
  if (typeof window !== 'undefined') {
    // Clean up event listeners on page unload
    window.addEventListener('beforeunload', () => {
      // Clear any intervals or timeouts
      // Only works in browser environments where setTimeout returns a number
      if (typeof window !== 'undefined' && typeof window.clearTimeout === 'function') {
        const highestTimeoutId = window.setTimeout(() => {}, 0)
        for (let i = 0; i <= highestTimeoutId; i++) {
          window.clearTimeout(i)
        }
        
        const highestIntervalId = window.setInterval(() => {}, 1000)
        for (let i = 0; i <= highestIntervalId; i++) {
          window.clearInterval(i)
        }
      }
    })
  }
}

// Bundle size analyzer helper
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available via: npm run analyze')
  }
}

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  preloadResources()
  addResourceHints()
  measurePerformance()
  optimizeMemory()
  
  // Register service worker in production
  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker()
  }
}
