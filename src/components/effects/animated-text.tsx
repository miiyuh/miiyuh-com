'use client'

import { useState, useEffect } from 'react'

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
  const [mounted, setMounted] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const textArray = Array.isArray(text) ? text : [text]
  const currentText = textArray[currentTextIndex]
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (!repeat || textArray.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textArray.length)
    }, (currentText.length * speed) + 2000) // Duration based on text length + pause
    
    return () => clearInterval(interval)
  }, [currentText, speed, repeat, textArray.length])
  
  if (!mounted) {
    return <span className={className}>{currentText}</span>
  }
  
  return (
    <span 
      className={`motion-preset-typewriter-[${speed}] ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        '--motion-typewriter-speed': `${speed}ms`
      } as React.CSSProperties & { [key: string]: string | number }}
    >
      {currentText}
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
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <div className={className}>{children}</div>
  }
  
  const getMotionClasses = () => {
    switch (variant) {
      case 'slide':
        return 'motion-preset-slide-right'
      case 'scale':
        return 'motion-preset-pop'
      default:
        return 'motion-preset-fade'
    }
  }
  
  return (
    <div 
      className={`${getMotionClasses()} ${className}`}
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}
