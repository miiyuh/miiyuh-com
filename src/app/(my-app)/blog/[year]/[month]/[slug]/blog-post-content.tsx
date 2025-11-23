'use client'

import { useRef } from 'react'
import { renderLexicalContent, type LexicalContent } from '@/utils/lexical-renderer'
import { TableOfContents } from '@/components/ui/table-of-contents'

type BlogPostContentProps = {
  content: LexicalContent | null
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const htmlContent = renderLexicalContent(content)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
      {/* Main content */}
      <article className="prose prose-invert max-w-none">
        <div
          ref={contentRef}
          className="lexical-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      {/* Table of contents sidebar - visible only on large screens */}
      <div className="hidden lg:block relative h-full border-l border-white/10 pl-8">
        <div className="sticky top-24 w-64">
          <TableOfContents contentRef={contentRef} />
        </div>
      </div>
    </div>
  )
}
