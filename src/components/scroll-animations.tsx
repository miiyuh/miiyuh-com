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
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay * 1000)
        }
      },
      { threshold }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [delay, threshold, hasAnimated])

  const getAnimationClasses = () => {
    const base = 'transition-all duration-700 ease-out'
    
    switch (animation) {
      case 'fadeUp':
        return `${base} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
      case 'fadeDown':
        return `${base} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`
      case 'fadeLeft':
        return `${base} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`
      case 'fadeRight':
        return `${base} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`
      case 'scale':
        return `${base} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`
      case 'rotate':
        return `${base} ${isVisible ? 'opacity-100 rotate-0' : 'opacity-0 rotate-12'}`
      default:
        return `${base} ${isVisible ? 'opacity-100' : 'opacity-0'}`
    }
  }

  return (
    <div 
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  )
}
