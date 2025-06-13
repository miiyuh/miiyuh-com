'use client'

import { PortableText, PortableTextBlock, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity'

// Blog content renderer component
interface BlogContentProps {
  content: PortableTextBlock[]
}

// Custom components for PortableText
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(450).url()}
            alt={value.alt || 'Blog image'}
            width={800}
            height={450}
            className="rounded-lg"
          />
          {value.caption && (
            <p className="text-sm text-[#FAF3E0]/60 mt-2 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
    codeBlock: ({ value }) => {
      return (
        <div className="my-6">
          {value.filename && (
            <div className="bg-[#2A2A2A] px-4 py-2 text-sm text-[#FAF3E0]/70 border-b border-[#FAF3E0]/10 rounded-t-lg">
              📄 {value.filename}
            </div>
          )}
          <pre className={`bg-[#1E1E1E] p-4 overflow-x-auto text-sm border border-[#FAF3E0]/10 ${value.filename ? 'rounded-b-lg' : 'rounded-lg'}`}>
            <code className={`language-${value.language || 'text'}`}>
              {value.code}
            </code>
          </pre>
          {value.language && (
            <div className="text-xs text-[#FAF3E0]/50 mt-1">
              Language: {value.language}
            </div>
          )}
        </div>
      )
    }
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href || value.href.startsWith('/') ? undefined : 'noreferrer noopener'
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-[#FAF3E0] underline hover:text-[#FAF3E0]/80 transition-colors"
        >
          {children}
        </a>
      )
    },
    code: ({ children }) => (
      <code className="bg-[#2A2A2A] px-2 py-1 rounded text-sm text-[#FAF3E0]/90">
        {children}
      </code>
    )
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold lowercase tracking-tight mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold lowercase tracking-tight mb-4 mt-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold lowercase tracking-tight mb-3 mt-5">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-bold lowercase tracking-tight mb-2 mt-4">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#FAF3E0]/30 pl-4 my-6 italic text-[#FAF3E0]/80">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-[#FAF3E0]/90">
        {children}
      </p>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-[#FAF3E0]/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-[#FAF3E0]/90">
        {children}
      </ol>
    )
  }
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
}
