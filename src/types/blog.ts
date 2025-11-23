import type { LexicalContent } from '@/utils/lexical-renderer'

export type BlogTag = {
  id?: string | number
  tag?: string | null
}

export type BlogMediaRelationship = {
  id?: string | number
  filename?: string | null
  url?: string | null
  alt?: string | null
  caption?: string | null
}

export type BlogPostDocument = {
  id: string | number
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: BlogMediaRelationship | string | null
  content?: LexicalContent | null
  publishedAt?: string | null
  tags?: BlogTag[] | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
  } | null
}

export type BlogPostCard = {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: {
    url: string
    alt?: string
    caption?: string
  }
  publishedAt: string
  tags: { tag: string }[]
}
