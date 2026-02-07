'use client'

import { useState, useEffect, useMemo } from 'react'

interface TypewriterTextProps {
  text: string | string[]
  className?: string
  speed?: number
  repeat?: boolean
  delay?: number
}

export function TypewriterText({ 
  text, 
  className = '', 
  speed = 100, 
  repeat = true,
  delay = 0 
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [textArrayIndex, setTextArrayIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  const textArray = useMemo(() => Array.isArray(text) ? text : [text], [text])
  const currentText = textArray[textArrayIndex]
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (!mounted) return
    
    let innerTimeout: ReturnType<typeof setTimeout> | null = null
    
    const timeout = setTimeout(() => {
      if (isTyping) {
        if (currentIndex < currentText.length) {
          setDisplayText(currentText.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        } else {
          if (repeat && textArray.length > 1) {
            innerTimeout = setTimeout(() => {
              setIsTyping(false)
            }, 1000)
          }
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(currentText.slice(0, currentIndex - 1))
          setCurrentIndex(currentIndex - 1)
        } else {
          setTextArrayIndex((textArrayIndex + 1) % textArray.length)
          setIsTyping(true)
        }
      }
    }, delay > 0 && currentIndex === 0 ? delay : (isTyping ? speed : speed / 2))
    
    return () => {
      clearTimeout(timeout)
      if (innerTimeout) clearTimeout(innerTimeout)
    }
  }, [mounted, currentIndex, isTyping, currentText, speed, repeat, textArray, textArrayIndex, delay])
  
  if (!mounted) {
    return <span className={className}>{Array.isArray(text) ? text[0] : text}</span>
  }
  
  return (
    <span className={`transition-opacity duration-300 ${className}`}>
      {displayText}
      <span className="animate-pulse ml-1">|</span>
    </span>
  )
}

interface AnimatedHeadingProps {
  children: React.ReactNode
  variant?: 'fade' | 'slide' | 'scale'
  delay?: number
  className?: string
}

export function AnimatedHeading({ 
  children, 
  variant = 'fade', 
  delay = 0,
  className = '' 
}: AnimatedHeadingProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)
    
    return () => clearTimeout(timer)
  }, [delay])
  
  if (!mounted) {
    return <div className={className}>{children}</div>
  }
  
  const getAnimationClasses = () => {
    const base = 'transition-all duration-1000 ease-out'
    
    switch (variant) {
      case 'slide':
        return `${base} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`
      case 'scale':
        return `${base} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`
      default:
        return `${base} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
    }
  }
  
  return (
    <div className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  )
}
