'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, set } from 'animejs'

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: 'fadeIn' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate'
  delay?: number
  threshold?: number
  className?: string
  duration?: number
  easing?: string
}

export function ScrollAnimation({
  children,
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.1,
  className = '',
  duration = 800,
  easing = 'out-expo'
}: ScrollAnimationProps) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set initial state based on animation type
    const setInitialState = () => {
      switch (animation) {
        case 'fadeUp':
          set(element, { opacity: 0, translateY: '50px' })
          break
        case 'fadeDown':
          set(element, { opacity: 0, translateY: '-50px' })
          break
        case 'fadeLeft':
          set(element, { opacity: 0, translateX: '50px' })
          break
        case 'fadeRight':
          set(element, { opacity: 0, translateX: '-50px' })
          break
        case 'scale':
          set(element, { opacity: 0, scale: 0.8 })
          break
        case 'rotate':
          set(element, { opacity: 0, rotate: '-10deg' })
          break
        default: // fadeIn
          set(element, { opacity: 0 })
      }
    }

    setInitialState()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Get animation target and properties
          setTimeout(() => {
            const animProps: Record<string, any> = {
              opacity: 1,
              duration: duration,
              ease: easing
            }

            switch (animation) {
              case 'fadeUp':
                animProps.translateY = '0px'
                break
              case 'fadeDown':
                animProps.translateY = '0px'
                break
              case 'fadeLeft':
                animProps.translateX = '0px'
                break
              case 'fadeRight':
                animProps.translateX = '0px'
                break
              case 'scale':
                animProps.scale = 1
                break
              case 'rotate':
                animProps.rotate = '0deg'
                break
            }

            // Trigger animation
            animate(element, animProps)
          }, delay * 1000)

          setHasAnimated(true)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [animation, delay, threshold, hasAnimated, duration, easing])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
