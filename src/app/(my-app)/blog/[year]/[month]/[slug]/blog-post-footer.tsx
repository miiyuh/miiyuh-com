'use client'

import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react'

export function BlogPostFooter() {
  return (
    <footer className="mt-12 border-t border-white/10 pt-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-text-primary hover:text-text-primary/80 transition-colors"
      >
        <ArrowLeft weight="bold" className="w-4 h-4 shrink-0" />
        <span>back to blog</span>
      </Link>
    </footer>
  )
}
