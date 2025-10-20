'use client'

import { useRef } from 'react'
import { renderLexicalContent } from '@/utils/lexical-renderer'
import { TableOfContents } from '@/components/ui/table-of-contents'

type BlogPostContentProps = {
  content: any
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const htmlContent = renderLexicalContent(content)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main content */}
      <article className="prose prose-invert max-w-none lg:col-span-3">
        <div
          ref={contentRef}
          className="lexical-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      {/* Table of contents sidebar - visible only on large screens */}
      <div className="hidden lg:block">
        <TableOfContents contentRef={contentRef} />
      </div>
    </div>
  )
}
