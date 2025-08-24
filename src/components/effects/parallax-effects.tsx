'use client'

import { useEffect, useState, useRef } from 'react'

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
  const [scrollY, setScrollY] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Throttle using requestAnimationFrame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const getTransform = () => {
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
  }

  return (
    <div 
      ref={elementRef}
      className={className}
      style={{ transform: getTransform() }}
    >
      {children}
    </div>
  )
}
