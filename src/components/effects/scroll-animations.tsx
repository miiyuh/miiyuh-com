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

  const getAnimationClasses = () => {
    const baseHidden = 'opacity-0'
    
    if (!isVisible) {
      switch (animation) {
        case 'fadeUp':
        case 'fadeDown':
        case 'fadeLeft':
        case 'fadeRight':
          return `${baseHidden} transform`
        case 'scale':
          return `${baseHidden} transform`
        case 'rotate':
          return `${baseHidden} transform`
        default:
          return baseHidden
      }
    }
    
    switch (animation) {
      case 'fadeUp':
        return 'animate-smooth-slide-up'
      case 'fadeDown':
        return 'animate-smooth-slide-down'
      case 'fadeLeft':
        return 'transition-all duration-700 ease-out opacity-100 translate-x-0'
      case 'fadeRight':
        return 'transition-all duration-700 ease-out opacity-100 -translate-x-0'
      case 'scale':
        return 'animate-smooth-scale'
      case 'rotate':
        return 'transition-all duration-700 ease-out opacity-100 rotate-0'
      default:
        return 'animate-smooth-fade-in'
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
