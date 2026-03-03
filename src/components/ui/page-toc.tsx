'use client'

import { useRef, useCallback, useEffect } from 'react'
import { AnchorProvider, ScrollProvider, TOCItem, type TOCItemType } from 'fumadocs-core/toc'
import { cn } from '@/lib/utils'

interface PageTOCProps {
  toc: TOCItemType[]
  className?: string
  scrollOffset?: number
}

function TocThumb({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const thumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const thumb = thumbRef.current
    if (!container || !thumb) return

    function update() {
      const anchors = container!.querySelectorAll<HTMLElement>(
        'a[data-active="true"]'
      )

      if (anchors.length === 0) {
        thumb!.style.opacity = '0'
        return
      }

      const first = anchors[0]
      const last = anchors[anchors.length - 1]
      const containerRect = container!.getBoundingClientRect()
      const firstRect = first.getBoundingClientRect()
      const lastRect = last.getBoundingClientRect()

      const top = firstRect.top - containerRect.top + container!.scrollTop
      const height = lastRect.bottom - firstRect.top

      thumb!.style.opacity = '1'
      thumb!.style.top = `${top}px`
      thumb!.style.height = `${height}px`
    }

    const observer = new MutationObserver(update)
    observer.observe(container, {
      attributes: true,
      attributeFilter: ['data-active'],
      subtree: true,
    })

    update()

    return () => observer.disconnect()
  }, [containerRef])

  return (
    <div
      ref={thumbRef}
      className="absolute left-0 w-0.5 rounded-full transition-all duration-150 ease-linear opacity-0"
      style={{ backgroundColor: 'var(--text-primary)' }}
    />
  )
}

function TOCContent({ toc, scrollOffset = 100, className }: PageTOCProps) {
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <nav className={cn('text-sm', className)} aria-label="Table of contents">
      <p className="text-xs font-medium text-text-muted/60 mb-4">On this page</p>

      <div className="relative">
        <TocThumb containerRef={containerRef} />
        <div
          ref={containerRef}
          className="flex flex-col border-l border-white/8 max-h-[calc(100vh-10rem)] overflow-y-auto overscroll-contain"
        >
          <ScrollProvider containerRef={containerRef}>
            {toc.map((item) => (
              <TOCItem
                key={item.url}
                href={item.url}
                onClick={(e) => handleClick(e, item.url)}
                className={cn(
                  'py-1.5 text-sm transition-colors duration-200',
                  'text-text-muted/40 hover:text-text-primary/70',
                  'data-[active=true]:text-text-primary',
                  item.depth <= 2 && 'ps-3',
                  item.depth === 3 && 'ps-6',
                  item.depth >= 4 && 'ps-8'
                )}
              >
                {item.title}
              </TOCItem>
            ))}
          </ScrollProvider>
        </div>
      </div>
    </nav>
  )
}

export function PageTOC({ toc, className, scrollOffset = 100 }: PageTOCProps) {
  if (toc.length === 0) return null

  return (
    <AnchorProvider toc={toc}>
      <TOCContent toc={toc} className={className} scrollOffset={scrollOffset} />
    </AnchorProvider>
  )
}