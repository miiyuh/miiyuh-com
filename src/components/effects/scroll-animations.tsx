'use client'

import { useEffect, useRef } from 'react'
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
  duration = 600,
  easing = 'easeInOutQuad'
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Reset animation state when dependencies change
    hasAnimatedRef.current = false

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
        default: // fadeIn - pop instantly onto screen
          set(element, { opacity: 1 })
      }
    }

    setInitialState()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true
          // For fadeIn (default), element is already visible, no animation needed
          if (animation !== 'fadeIn') {
            setTimeout(() => {
              const animProps: Record<string, number | string> = {
                opacity: 1,
                duration,
                easing
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
          }
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [animation, delay, threshold, duration, easing])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
