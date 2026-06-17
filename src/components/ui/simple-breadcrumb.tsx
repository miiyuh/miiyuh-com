'use client'

import Link from 'next/link'
import { useWebHaptics } from 'web-haptics/react'

const INTER_FONT_STACK = "'Inter', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Emoji', var(--font-noto-color-emoji), sans-serif"

export interface BreadcrumbItem {
    label: string
    href?: string
}

interface SimpleBreadcrumbProps {
    items: BreadcrumbItem[]
    className?: string
}

export function SimpleBreadcrumb({ items, className = '' }: SimpleBreadcrumbProps) {
    const haptic = useWebHaptics()
    return (
        <nav
            className={`mb-8 flex items-center gap-2 text-sm font-sans font-normal text-text-primary/60 overflow-hidden ${className}`}
            style={{ fontFamily: INTER_FONT_STACK, userSelect: 'none' }}
        >
            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                    {item.href ? (
                        <Link href={item.href} className="hover:text-text-primary transition-colors whitespace-nowrap" onClick={() => haptic.trigger('light')}>
                            {item.label}
                        </Link>
                    ) : (
                        <span className={index === items.length - 1 ? "text-text-primary truncate" : "shrink-0"}>
                            {item.label}
                        </span>
                    )}
                    {index < items.length - 1 && <span className="shrink-0">/</span>}
                </span>
            ))}
        </nav>
    )
}
