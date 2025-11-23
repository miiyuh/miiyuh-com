'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const INTER_FONT_STACK = "'Inter', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', var(--font-noto-color-emoji), sans-serif"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps extends React.HTMLAttributes<HTMLDivElement> {
  contentRef: React.RefObject<HTMLDivElement | HTMLElement | null>
}

type LevelStyles = {
  itemClass: string
  linkClass: string
  bulletClass?: string
}

const getLevelStyles = (level: number): LevelStyles => {
  if (level <= 1) {
    return {
      itemClass: 'mt-3 first:mt-0',
      linkClass: 'text-[0.68rem] tracking-[0.32em] uppercase text-text-muted',
    }
  }

  if (level === 2) {
    return {
      itemClass: 'pl-2',
      linkClass: 'text-sm text-text-secondary',
      bulletClass: 'w-1.5 h-1.5 rounded-full bg-white/60',
    }
  }

  return {
    itemClass: 'pl-5',
    linkClass: 'text-xs text-text-muted',
    bulletClass: 'w-1 h-1 rounded-full bg-white/40',
  }
}

export function TableOfContents({ contentRef, className, ...props }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!contentRef.current) return

    const timer = setTimeout(() => {
      const headingElements = Array.from(
        contentRef.current?.querySelectorAll('h1, h2, h3, h4') || []
      ) as HTMLHeadingElement[]

      const extractedHeadings: Heading[] = headingElements.map((el, index) => {
        if (!el.id) {
          el.id = `heading-${index}`
        }

        const level = parseInt(el.tagName[1])
        return {
          id: el.id,
          text: el.textContent || '',
          level,
        }
      })

      setHeadings(extractedHeadings)

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
            }
          })
        },
        { rootMargin: '0% 0px -80% 0px' }
      )

      headingElements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    }, 100)

    return () => clearTimeout(timer)
  }, [contentRef])

  if (headings.length === 0) return null

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div
      className={cn("", className)}
      style={{ fontFamily: INTER_FONT_STACK }}
      {...props}
    >
      <h5 className="text-text-primary font-semibold mb-4 text-sm leading-6">On this page</h5>
      <ul className="text-sm leading-6">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          const { itemClass, linkClass, bulletClass } = getLevelStyles(heading.level)

          return (
            <li key={heading.id} className={cn('py-0.5', itemClass)}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(heading.id)
                }}
                className={cn(
                  'flex items-center gap-3 rounded-sm px-3 py-1 transition-all duration-200 border border-transparent hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary/80',
                  linkClass,
                  isActive && 'text-accent-primary bg-white/5 border-accent-primary/30'
                )}
              >
                {bulletClass && (
                  <span
                    className={cn(
                      'shrink-0 transition-transform duration-200',
                      bulletClass,
                      isActive && 'bg-accent-primary scale-110'
                    )}
                  />
                )}
                <span className="truncate">{heading.text}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
