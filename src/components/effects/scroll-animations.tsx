'use client'

import { useEffect, useState, useRef } from 'react'

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: 'fadeIn' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate'
  delay?: number
  threshold?: number
  className?: string
}

export function ScrollAnimation({
  children,
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.1,
  className = ''
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          const timer = setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay * 1000)
          
          return () => clearTimeout(timer)
        }
      },
      { threshold }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [delay, threshold, hasAnimated])

  const getMotionClasses = () => {
    if (!isVisible) return 'opacity-0'
    
    switch (animation) {
      case 'fadeUp':
        return 'motion-preset-slide-up'
      case 'fadeDown':
        return 'motion-preset-slide-down'
      case 'fadeLeft':
        return 'motion-preset-slide-left'
      case 'fadeRight':
        return 'motion-preset-slide-right'
      case 'scale':
        return 'motion-preset-pop'
      case 'rotate':
        return 'motion-preset-wobble'
      default:
        return 'motion-preset-fade'
    }
  }

  return (
    <div 
      ref={elementRef}
      className={`${getMotionClasses()} ${className}`}
      style={{
        animationDelay: isVisible ? `${delay * 1000}ms` : '0ms'
      }}
    >
      {children}
    </div>
  )
}
