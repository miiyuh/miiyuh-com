'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ImageSkeleton } from './loading-skeletons'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  fill?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 80,
  sizes,
  fill = false,
  placeholder = 'empty',
  blurDataURL
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`bg-[#F59E0B]/20 rounded flex items-center justify-center ${className}`}>
        <span className="text-[#F59E0B]/50 text-sm">Failed to load image</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <ImageSkeleton 
          className="absolute inset-0" 
          aspectRatio={width && height ? `aspect-[${width}/${height}]` : 'aspect-video'} 
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}

// Generate blur data URL for better loading experience
export const generateBlurDataURL = (width: number, height: number): string => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  
  // Create a simple gradient blur
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, 'rgba(139, 90, 43, 0.1)')
  gradient.addColorStop(1, 'rgba(250, 243, 224, 0.1)')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  
  return canvas.toDataURL()
}

// Lazy loading wrapper for images
export const LazyImage = (props: OptimizedImageProps) => {
  return (
    <OptimizedImage
      {...props}
      placeholder="blur"
      blurDataURL={props.blurDataURL || generateBlurDataURL(props.width || 400, props.height || 300)}
    />
  )
}
