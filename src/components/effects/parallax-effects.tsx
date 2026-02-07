'use client'

import { useEffect, useRef, useCallback } from 'react'

interface ParallaxElementProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function ParallaxElement({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '' 
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  const getTransform = useCallback((scrollY: number) => {
    const offset = scrollY * speed
    switch (direction) {
      case 'down':
        return `translate3d(0, ${offset}px, 0)`
      case 'left':
        return `translate3d(-${offset}px, 0, 0)`
      case 'right':
        return `translate3d(${offset}px, 0, 0)`
      default:
        return `translate3d(0, -${offset}px, 0)`
    }
  }, [speed, direction])

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        if (elementRef.current) {
          elementRef.current.style.transform = getTransform(window.scrollY)
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [getTransform])

  return (
    <div 
      ref={elementRef}
      className={className}
    >
      {children}
    </div>
  )
}
