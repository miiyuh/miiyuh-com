'use client'

import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { MousePointer2, Hand, Eye, Move, Copy, Pointer } from 'lucide-react'

type CursorType = 'default' | 'link' | 'hover' | 'grab' | 'view' | 'move' | 'copy'

interface CustomCursorProps {
  className?: string
}

export function CustomCursor({ className = '' }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState<CursorType>('default')
  const [isVisible, setIsVisible] = useState(false)
  const animationFrameId = useRef<number | null>(null)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const throttleTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Stable throttle function with proper cleanup
  const throttle = useCallback(<T extends unknown[]>(func: (...args: T) => void, delay: number) => {
    return (...args: T) => {
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current)
      }
      
      throttleTimerRef.current = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }, [])

  // Optimized mouse position update using requestAnimationFrame
  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
    }
    
    animationFrameId.current = requestAnimationFrame(() => {
      const newX = e.clientX
      const newY = e.clientY
      
      // Only update if position changed significantly (reduce unnecessary renders)
      if (Math.abs(newX - lastMousePosition.current.x) > 1 || 
          Math.abs(newY - lastMousePosition.current.y) > 1) {
        setMousePosition({ x: newX, y: newY })
        lastMousePosition.current = { x: newX, y: newY }
      }
    })
    
    setIsVisible(true)
  }, [])

  // Function to determine cursor type based on element
  const determineCursorType = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    
    // Check for specific cursor types based on element attributes or classes
    if (target.closest('[data-cursor="link"]') || target.closest('a') || target.closest('button')) {
      setCursorType('link')
    } else if (target.closest('[data-cursor="hover"]') || target.closest('.group')) {
      setCursorType('hover')
    } else if (target.closest('[data-cursor="grab"]')) {
      setCursorType('grab')
    } else if (target.closest('[data-cursor="view"]') || target.closest('img') || target.closest('iframe')) {
      setCursorType('view')
    } else if (target.closest('[data-cursor="move"]')) {
      setCursorType('move')
    } else if (target.closest('[data-cursor="copy"]')) {
      setCursorType('copy')
    } else {
      setCursorType('default')
    }
  }, [])

  // Throttled cursor type update with stable reference
  const throttledCursorUpdate = useMemo(
    () => throttle(determineCursorType, 16),
    [throttle, determineCursorType]
  )

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition, { passive: true })
    document.addEventListener('mousemove', throttledCursorUpdate, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mousemove', throttledCursorUpdate)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      
      // Clean up animation frame and throttle timer
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current)
      }
    }
  }, [updateMousePosition, throttledCursorUpdate, handleMouseLeave, handleMouseEnter])

  // Memoized cursor icon to prevent unnecessary re-renders
  const getCursorIcon = useCallback(() => {
    switch (cursorType) {
      case 'link':
        return <Pointer size={24} />
      case 'hover':
        return <Hand size={24} />
      case 'grab':
        return <Hand size={24} />
      case 'view':
        return <Eye size={24} />
      case 'move':
        return <Move size={24} />
      case 'copy':
        return <Copy size={24} />
      default:
        return <MousePointer2 size={24} />
    }
  }, [cursorType])

  // Optimized cursor style calculation
  const getCursorStyle = useCallback(() => {
    const baseTransform = 'translate(-50%, -50%)'
    
    switch (cursorType) {
      case 'grab':
        return {
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `${baseTransform} rotate(-10deg)`,
        }
      case 'move':
        return {
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `${baseTransform} rotate(45deg)`,
        }
      default:
        return {
          left: mousePosition.x,
          top: mousePosition.y,
          transform: baseTransform,
        }
    }
  }, [mousePosition.x, mousePosition.y, cursorType])

  if (!isVisible) return null

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out ${className}`}
      style={getCursorStyle()}
      role="presentation"
      aria-hidden="true"
    >
      <div className="relative">
        {/* Main cursor icon */}
        <div 
          className={`
            flex items-center justify-center
            text-[#FAF3E0]
            transition-colors duration-100
          `}
        >
          {getCursorIcon()}
        </div>


      </div>
    </div>
  )
}

// Hook to easily set cursor types
export function useCursor() {
  const setCursor = (type: CursorType, element?: HTMLElement) => {
    const target = element || document.body
    target.setAttribute('data-cursor', type)
  }

  const resetCursor = (element?: HTMLElement) => {
    const target = element || document.body
    target.removeAttribute('data-cursor')
  }

  return { setCursor, resetCursor }
}