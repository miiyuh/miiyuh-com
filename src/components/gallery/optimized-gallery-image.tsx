'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useImageQuality } from '@/hooks/use-image-quality'
import type { GalleryItem } from '@/types/gallery'

interface OptimizedGalleryImageProps {
  image: GalleryItem
  index: number
  onLoad: (index: number) => void
  onVisible: (index: number) => void
  className?: string
  sizes?: string
  quality?: number
  priority?: boolean
}

export function OptimizedGalleryImage({
  image,
  index,
  onLoad,
  onVisible,
  className = "",
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 20vw, 15vw",
  quality = 80,
  priority = false
}: OptimizedGalleryImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(priority)
  const elementRef = useRef<HTMLDivElement>(null)
  const { quality: adaptiveQuality } = useImageQuality({ 
    baseQuality: quality,
    enableAdaptiveQuality: !priority 
  })

  useEffect(() => {
    if (priority) return

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          onVisible(index)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.01,
        rootMargin: '100px' // Reduced from 200px for more aggressive lazy loading
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [index, onVisible, priority])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad(index)
  }

  const handleError = () => {
    setHasError(true)
  }

  // Don't render image until it's visible (unless priority)
  if (!priority && !isVisible) {
    return (
      <div ref={elementRef} className={`w-full aspect-square ${className}`}>
        <div className="w-full h-full bg-white/5 animate-pulse rounded-2xl" />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className={`w-full aspect-square ${className}`}>
        <div className="w-full h-full bg-white/10 rounded-2xl flex items-center justify-center text-text-muted">
          <span className="text-sm">Failed to load</span>
        </div>
      </div>
    )
  }

  return (
    <div ref={elementRef} className={`w-full aspect-square relative ${className}`}>
      <Image
        src={image.src}
        alt={image.title || 'Gallery image'}
        fill
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes={sizes}
        quality={priority ? quality : adaptiveQuality}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}