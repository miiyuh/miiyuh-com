'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { AnchorProvider, ScrollProvider, TOCItem, type TOCItemType } from 'fumadocs-core/toc'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWebHaptics } from 'web-haptics/react'

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
  const haptic = useWebHaptics()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
      e.preventDefault()
      haptic.trigger('selection')
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
    [scrollOffset, haptic]
  )

  return (
    <nav className={cn('text-sm', className)} aria-label="Table of contents">
      <p className="font-serif text-lg font-medium text-text-muted/60 mb-4">On this page</p>

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

// ---------------------------------------------------------------------------
// Mobile sticky TOC — collapsible bar that sticks to the top on scroll
// ---------------------------------------------------------------------------

function MobileTOCContent({ toc, scrollOffset = 80 }: PageTOCProps) {
  const [open, setOpen] = useState(false)
  const [activeTitle, setActiveTitle] = useState<string | null>(null)
  const haptic = useWebHaptics()
  const containerRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  // Track active heading title for collapsed bar label
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function update() {
      const active = container!.querySelector<HTMLElement>('a[data-active="true"]')
      setActiveTitle(active?.textContent?.trim() ?? null)
    }

    const observer = new MutationObserver(update)
    observer.observe(container, {
      attributes: true,
      attributeFilter: ['data-active'],
      subtree: true,
    })

    update()
    return () => observer.disconnect()
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
      e.preventDefault()
      haptic.trigger('selection')
      setOpen(false)
      const id = url.replace('#', '')
      const element = document.getElementById(id)
      if (!element) return
      const barHeight = barRef.current?.offsetHeight ?? 0
      const totalOffset = scrollOffset + barHeight
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - totalOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      history.pushState(null, '', url)
      element.setAttribute('tabindex', '-1')
      element.focus({ preventScroll: true })
    },
    [scrollOffset, haptic]
  )

  return (
    <div
      ref={barRef}
      className="lg:hidden sticky top-[72px] z-30 -mx-6 sm:-mx-6"
    >
      <div className="bg-[#070707]/95 backdrop-blur-md border-t border-b border-white/8">

        {/* Toggle button */}
        <button
          onClick={() => { setOpen((v) => !v); haptic.trigger('selection') }}
          className="flex items-center justify-between w-full px-6 py-3 gap-4"
          aria-expanded={open}
          aria-label="Toggle table of contents"
        >
          <span className="text-sm text-text-secondary/70 truncate">
            {activeTitle ?? <span className="text-text-muted/30 text-xs font-mono uppercase tracking-widest">Contents</span>}
          </span>
          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 text-text-muted/40 transition-transform duration-200 shrink-0',
              open && 'rotate-180'
            )}
          />
        </button>

        {/* Animated dropdown — always in DOM so MutationObserver works */}
        <div
          className={cn(
            'grid transition-[grid-template-rows,opacity] duration-200 ease-out',
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-white/6 px-6 pb-4 pt-2">
              <div
                ref={containerRef}
                className="flex flex-col max-h-56 overflow-y-auto overscroll-contain"
              >
                <ScrollProvider containerRef={containerRef}>
                  {toc.map((item) => (
                    <TOCItem
                      key={item.url}
                      href={item.url}
                      onClick={(e) => handleClick(e, item.url)}
                      className={cn(
                        'py-1.5 leading-snug transition-colors duration-150 border-l-2 border-transparent',
                        'text-text-muted/45 hover:text-text-secondary hover:border-white/10',
                        'data-[active=true]:text-text-primary data-[active=true]:border-text-primary/60',
                        item.depth <= 2 ? 'ps-3 text-sm' : item.depth === 3 ? 'ps-6 text-[13px]' : 'ps-8 text-[13px]'
                      )}
                    >
                      {item.title}
                    </TOCItem>
                  ))}
                </ScrollProvider>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
export function MobileTOC({ toc, className, scrollOffset = 80 }: PageTOCProps) {
  if (toc.length === 0) return null

  return (
    <AnchorProvider toc={toc}>
      <MobileTOCContent toc={toc} className={className} scrollOffset={scrollOffset} />
    </AnchorProvider>
  )
}