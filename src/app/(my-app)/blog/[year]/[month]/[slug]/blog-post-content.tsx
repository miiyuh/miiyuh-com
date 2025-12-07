'use client'

import type { TOCItemType } from 'fumadocs-core/toc'
import { renderLexicalContent, type LexicalContent } from '@/utils/lexical-renderer'
import { PageTOC } from '@/components/ui/page-toc'

type BlogPostContentProps = {
  content: LexicalContent | null
  toc: TOCItemType[]
}

export default function BlogPostContent({ content, toc }: BlogPostContentProps) {
  const htmlContent = renderLexicalContent(content)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
      {/* Main content */}
      <article className="prose prose-invert max-w-none">
        <div
          className="lexical-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      {/* Table of contents sidebar - visible only on large screens */}
      <div className="hidden lg:block relative h-full border-l border-white/10 pl-8">
        <div className="sticky top-24 w-64">
          <PageTOC toc={toc} />
        </div>
      </div>
    </div>
  )
}
