'use client'

import { useState, memo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useWebHaptics } from 'web-haptics/react'

interface HeadingWithHashProps {
  id: string
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  children: React.ReactNode
}

const HeadingWithHashComponent = memo(function HeadingWithHash({ id, level, className = '', children }: HeadingWithHashProps) {
  const [copied, setCopied] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const haptic = useWebHaptics()

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const copyToClipboard = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    try {
      await navigator.clipboard.writeText(url)
      haptic.trigger('success')
      setCopied(true)
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
      resetTimerRef.current = setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }, [id, haptic])

  const Component = level

  return (
    <Component 
      id={id} 
      className={`group relative ${className}`}
    >
      <Link 
        href={`#${id}`}
        className="flex items-center gap-2 no-underline"
        onClick={(e) => {
          e.preventDefault()
          copyToClipboard()
          
          // Smooth scroll to section
          const element = document.getElementById(id)
          if (element) {
            const headerHeight = 96
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - headerHeight
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }}
      >
        <span>{children}</span>
        <span 
          className="opacity-0 scale-90 blur-[2px] group-hover:opacity-100 group-hover:scale-100 group-hover:blur-0 transition-all duration-200 text-[#FAF3E0]/40 hover:text-[#FAF3E0]/80 cursor-pointer select-none text-sm"
          title={copied ? 'Copied to clipboard!' : 'Copy link to this section'}
        >
          {copied ? '✓' : '#'}
        </span>
      </Link>
    </Component>
  )
})

HeadingWithHashComponent.displayName = 'HeadingWithHash'

export const HeadingWithHash = HeadingWithHashComponent
