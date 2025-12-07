'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { AnchorProvider, ScrollProvider, TOCItem, type TOCItemType } from 'fumadocs-core/toc'
import { cn } from '@/lib/utils'
import { List } from 'lucide-react'
import { motion } from 'motion/react'

interface PageTOCProps {
  toc: TOCItemType[]
  className?: string
  scrollOffset?: number
}

const INDENT_STEP = 16

export function PageTOC({ toc, className, scrollOffset = 100 }: PageTOCProps) {
  const tocContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const [backgroundPath, setBackgroundPath] = useState('')
  const [activePath, setActivePath] = useState('')
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 })

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
      e.preventDefault()
      const id = url.replace('#', '')
      const element = document.getElementById(id)

      if (!element) return

      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - scrollOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      history.pushState(null, '', url)
      element.setAttribute('tabindex', '-1')
      element.focus({ preventScroll: true })
    },
    [scrollOffset]
  )

  // Track active item
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const activeItem = tocContainerRef.current?.querySelector('[data-active="true"]')
      if (activeItem) {
        const index = itemRefs.current.findIndex((ref) => ref === activeItem)
        if (index !== -1 && index !== activeIndex) {
          setActiveIndex(index)
        }
      }
    })

    if (tocContainerRef.current) {
      observer.observe(tocContainerRef.current, {
        attributes: true,
        attributeFilter: ['data-active'],
        subtree: true,
      })
    }

    return () => observer.disconnect()
  }, [activeIndex])

  // Build SVG paths
  useEffect(() => {
    if (!tocContainerRef.current || toc.length === 0) return

    const containerRect = tocContainerRef.current.getBoundingClientRect()
    const containerTop = containerRect.top

    const getPosition = (index: number) => {
      const el = itemRefs.current[index]
      if (!el) return { x: 0, y: 0, height: 0 }

      const rect = el.getBoundingClientRect()
      const item = toc[index]
      const depthOffset = Math.max(0, item.depth - (toc[0]?.depth || 2))
      const x = depthOffset * INDENT_STEP + 4
      const y = rect.top - containerTop
      const height = rect.height

      return { x, y, height }
    }

    // Build full background path
    let bgd = ''
    for (let i = 0; i < toc.length; i++) {
      const curr = getPosition(i)

      if (i === 0) {
        bgd = `M ${curr.x} ${curr.y} L ${curr.x} ${curr.y + curr.height}`
      } else {
        const prev = getPosition(i - 1)
        const startY = prev.y + prev.height
        const dx = curr.x - prev.x
        const dy = curr.y - startY

        if (dx === 0) {
          // Same level - straight down
          bgd += ` L ${curr.x} ${curr.y}`
        } else if (dx > 0) {
          // Going right - down then diagonal
          const diagonal = Math.abs(dx)
          if (dy > diagonal) {
            bgd += ` L ${prev.x} ${curr.y - diagonal}`
          }
          bgd += ` L ${curr.x} ${curr.y}`
        } else {
          // Going left - down then diagonal
          const diagonal = Math.abs(dx)
          if (dy > diagonal) {
            bgd += ` L ${prev.x} ${curr.y - diagonal}`
          }
          bgd += ` L ${curr.x} ${curr.y}`
        }

        bgd += ` L ${curr.x} ${curr.y + curr.height}`
      }
    }

    setBackgroundPath(bgd)

    // Build active path (first to active)
    let actd = ''
    for (let i = 0; i <= activeIndex; i++) {
      const curr = getPosition(i)

      if (i === 0) {
        actd = `M ${curr.x} ${curr.y} L ${curr.x} ${curr.y + curr.height}`
      } else {
        const prev = getPosition(i - 1)
        const startY = prev.y + prev.height
        const dx = curr.x - prev.x
        const dy = curr.y - startY

        if (dx === 0) {
          actd += ` L ${curr.x} ${curr.y}`
        } else if (dx > 0) {
          const diagonal = Math.abs(dx)
          if (dy > diagonal) {
            actd += ` L ${prev.x} ${curr.y - diagonal}`
          }
          actd += ` L ${curr.x} ${curr.y}`
        } else {
          const diagonal = Math.abs(dx)
          if (dy > diagonal) {
            actd += ` L ${prev.x} ${curr.y - diagonal}`
          }
          actd += ` L ${curr.x} ${curr.y}`
        }

        actd += ` L ${curr.x} ${curr.y + curr.height}`
      }
    }

    setActivePath(actd)

    const active = getPosition(activeIndex)
    setDotPosition({ x: active.x, y: active.y + active.height })
  }, [activeIndex, toc])

  if (toc.length === 0) return null

  return (
    <AnchorProvider toc={toc}>
      <nav className={cn('text-sm', className)} aria-label="Table of contents">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 flex items-center gap-2 text-[#faf3e0]"
        >
          <List className="site-icon h-4 w-4" />
          <span className="font-medium text-[#faf3e0]">On this page</span>
        </motion.div>

        <div
          ref={tocContainerRef}
          className="max-h-[calc(100vh-10rem)] overflow-y-auto overscroll-contain relative pl-1"
        >
          <svg
            className="absolute top-0 left-0 h-full w-full pointer-events-none overflow-visible"
            style={{ zIndex: 0 }}
          >
            {/* Background path */}
            <motion.path
              d={backgroundPath}
              fill="none"
              stroke="#faf3e0"
              strokeOpacity="0.15"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Active path */}
            <motion.path
              d={activePath}
              fill="none"
              stroke="#faf3e0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={false}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1],
              }}
            />

            {/* Active dot */}
            <motion.circle
              cx={dotPosition.x}
              cy={dotPosition.y}
              r="3"
              fill="#faf3e0"
              initial={false}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <animate
                attributeName="r"
                values="3;4.5;3"
                dur="2s"
                repeatCount="indefinite"
              />
            </motion.circle>
          </svg>

          <ScrollProvider containerRef={tocContainerRef}>
            <ul className="flex flex-col gap-0 relative" role="list">
              {toc.map((item, index) => {
                const depthOffset = Math.max(0, item.depth - (toc[0]?.depth || 2))
                const indentPixels = depthOffset * INDENT_STEP + 16

                return (
                  <motion.li
                    key={item.url}
                    style={{ paddingLeft: `${indentPixels}px` }}
                    className="relative"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                  >
                    <TOCItem
                      ref={(el) => {
                        itemRefs.current[index] = el
                      }}
                      href={item.url}
                      onClick={(e) => handleClick(e, item.url)}
                      className={cn(
                        'block py-1.5 text-sm transition-colors duration-200',
                        'text-[#faf3e0]/50',
                        'hover:text-[#faf3e0]/80',
                        'data-[active=true]:text-[#faf3e0] data-[active=true]:font-medium'
                      )}
                    >
                      {item.title}
                    </TOCItem>
                  </motion.li>
                )
              })}
            </ul>
          </ScrollProvider>
        </div>
      </nav>
    </AnchorProvider>
  )
}