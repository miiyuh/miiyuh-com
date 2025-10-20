'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLDivElement | HTMLElement | null>
}

export function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!contentRef.current) return

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // Extract headings from the content
      const headingElements = Array.from(
        contentRef.current?.querySelectorAll('h1, h2, h3, h4, h5, h6') || []
      ) as HTMLHeadingElement[]

      const extractedHeadings: Heading[] = headingElements.map((el, index) => {
        // Generate ID if not present
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

      // Set up intersection observer to track active heading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
            }
          })
        },
        { rootMargin: '-50% 0px -50% 0px' }
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
      const headerOffset = 90 // Account for header height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
      <nav className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FAF3E0]/60 mb-4">
          On this page
        </h3>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ marginLeft: `${(heading.level - 1) * 0.75}rem` }}
            >
              <button
                onClick={() => handleClick(heading.id)}
                className={`transition-colors duration-200 text-left hover:text-[#FAF3E0] ${
                  activeId === heading.id
                    ? 'text-[#FAF3E0] font-medium'
                    : 'text-[#FAF3E0]/60'
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
