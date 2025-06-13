import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { PortableTextBlock } from '@portabletext/types'

// Sanity configuration
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}

// Create Sanity client
export const sanity = createClient(sanityConfig)

// Image URL builder
const builder = imageUrlBuilder(sanity)
export const urlFor = (source: SanityImageSource) => builder.image(source)

// Blog post type definition
export interface BlogPost {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  content: PortableTextBlock[] // Portable Text content
  coverImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  category: {
    _id: string
    title: string
    slug: {
      current: string
    }
    color?: string
  }
  tags?: Array<{
    _id: string
    title: string
    slug: {
      current: string
    }
  }>
  publishedAt: string
  readTime?: number
  featured?: boolean
}

// Category type
export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color?: string
}

// Tag type
export interface Tag {
  _id: string
  title: string
  slug: {
    current: string
  }
}

// GROQ queries for fetching blog data
export const queries = {
  // Get all published posts
  allPosts: `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    coverImage,
    category->{
      _id,
      title,
      slug,
      color
    },
    tags[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    readTime,
    featured
  }`,

  // Get featured posts
  featuredPosts: `*[_type == "post" && defined(publishedAt) && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category->{
      _id,
      title,
      slug,
      color
    },
    publishedAt,
    readTime
  }`,

  // Get post by slug
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    content,
    coverImage,
    category->{
      _id,
      title,
      slug,
      color
    },
    tags[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    readTime,
    featured
  }`,

  // Get posts by category
  postsByCategory: `*[_type == "post" && defined(publishedAt) && category->slug.current == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category->{
      _id,
      title,
      slug,
      color
    },
    tags[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    readTime
  }`,

  // Get posts by tag
  postsByTag: `*[_type == "post" && defined(publishedAt) && $tag in tags[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category->{
      _id,
      title,
      slug,
      color
    },
    tags[]->{
      _id,
      title,
      slug
    },
    publishedAt,
    readTime
  }`,

  // Get all categories
  allCategories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    "postCount": count(*[_type == "post" && references(^._id) && defined(publishedAt)])
  }`,

  // Get all tags
  allTags: `*[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug,
    "postCount": count(*[_type == "post" && references(^._id) && defined(publishedAt)])
  }`
}
