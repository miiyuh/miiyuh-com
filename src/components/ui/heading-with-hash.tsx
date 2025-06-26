'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HeadingWithHashProps {
  id: string
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  children: React.ReactNode
}

export function HeadingWithHash({ id, level, className = '', children }: HeadingWithHashProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

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
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#FAF3E0]/40 hover:text-[#FAF3E0]/80 cursor-pointer select-none text-sm"
          title={copied ? 'Copied to clipboard!' : 'Copy link to this section'}
        >
          {copied ? '✓' : '#'}
        </span>
      </Link>
    </Component>
  )
}
