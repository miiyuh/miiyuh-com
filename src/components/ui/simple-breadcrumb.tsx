'use client'

import Link from 'next/link'
import { useWebHaptics } from 'web-haptics/react'
import type { ReactNode } from 'react'

const INTER_FONT_STACK = "'Inter', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', var(--font-noto-color-emoji), sans-serif"

export interface BreadcrumbItem {
    label: string
    href?: string
}

interface SimpleBreadcrumbProps {
    items: BreadcrumbItem[]
    className?: string
    trailing?: ReactNode
}

export function SimpleBreadcrumb({ items, className = '', trailing }: SimpleBreadcrumbProps) {
    const haptic = useWebHaptics()
    return (
        <nav
            className={`sticky md:static top-19 z-40 -mx-8 px-8 py-2 bg-bg-primary/90 backdrop-blur-xl mb-8 flex items-center gap-1 md:gap-2 text-xs md:text-sm font-sans font-normal text-text-primary/60 min-w-0 group ${className}`}
            style={{ fontFamily: INTER_FONT_STACK, userSelect: 'none' }}
        >
            {items.flatMap((item, index) => {
                const content = item.href ? (
                    <Link key={index} href={item.href} className="hover:text-text-primary transition-colors whitespace-nowrap shrink-0" onClick={() => haptic.trigger('light')}>
                        {item.label}
                    </Link>
                ) : (
                    <span key={index} className={index === items.length - 1 ? "text-text-primary truncate min-w-0" : "shrink-0"}>
                        {item.label}
                    </span>
                )
                return index < items.length - 1
                    ? [content, <span key={`sep-${index}`} className="shrink-0">/</span>]
                    : [content]
            })}
            {trailing && (
                <span className="ml-auto shrink-0 flex items-center">
                    {trailing}
                </span>
            )}
        </nav>
    )
}
