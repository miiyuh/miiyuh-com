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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getTransform = () => {
    const offset = scrollY * speed
    
    switch (direction) {
      case 'down':
        return `translateY(${offset}px)`
      case 'left':
        return `translateX(-${offset}px)`
      case 'right':
        return `translateX(${offset}px)`
      default:
        return `translateY(-${offset}px)`
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
