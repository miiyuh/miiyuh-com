import type { LexicalContent } from '@/utils/lexical-renderer'
import type { JxlSource } from '@/utils/media'

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
  jxl?: { filename?: string | null; width?: number | null }[] | null
}

export type BlogPostDocument = {
  id: string | number
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: BlogMediaRelationship | string | null
  content?: LexicalContent | null
  publishedAt?: string | null
  updatedAt?: string | null
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
    jxl?: JxlSource[]
  }
  publishedAt: string
  tags: { tag: string }[]
}
