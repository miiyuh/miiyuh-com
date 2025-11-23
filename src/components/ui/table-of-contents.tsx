'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps extends React.HTMLAttributes<HTMLDivElement> {
  contentRef: React.RefObject<HTMLDivElement | HTMLElement | null>
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
    <div className={cn("", className)} {...props}>
      <h5 className="text-text-primary font-semibold mb-4 text-sm leading-6">On this page</h5>
      <ul className="text-text-secondary text-sm leading-6">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          const isNested = heading.level > 2

          return (
            <li key={heading.id} className={cn(isNested && "ml-4")}>
              {isNested ? (
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick(heading.id)
                  }}
                  className={cn(
                    "group flex items-start py-1 transition-colors",
                    isActive
                      ? "text-accent-primary"
                      : "hover:text-text-primary"
                  )}
                >
                  <svg
                    width="3"
                    height="24"
                    viewBox="0 -9 3 24"
                    className="mr-2 text-text-muted overflow-visible group-hover:text-text-secondary"
                  >
                    <path
                      d="M0 0L3 3L0 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {heading.text}
                </a>
              ) : (
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick(heading.id)
                  }}
                  className={cn(
                    "block py-1 font-medium transition-colors",
                    isActive
                      ? "text-accent-primary"
                      : "hover:text-text-primary"
                  )}
                >
                  {heading.text}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
