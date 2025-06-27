import { Metadata } from 'next'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: Record<string, unknown>
  featuredImage?: {
    url: string
    alt: string
    width: number
    height: number
  }
  author: {
    id: string
    email: string
    name: string
  }
  categories?: Array<{
    category: string
  }>
  tags?: Array<{
    tag: string
  }>
  publishedDate: string
  status: 'draft' | 'published'
  featured?: boolean
  createdAt: string
  updatedAt: string
}

interface GenerateMetadataProps {
  post?: BlogPost
  isListPage?: boolean
  searchQuery?: string
  category?: string
}

export function generateBlogMetadata({ 
  post, 
  isListPage = false, 
  searchQuery,
  category 
}: GenerateMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://miiyuh.com'
  
  if (isListPage) {
    let title = 'Blog - miiyuh'
    let description = 'Thoughts, tutorials, and digital wanderings by miiyuh. Explore articles on technology, design, photography, and personal experiences.'
    
    if (searchQuery) {
      title = `Search results for "${searchQuery}" - miiyuh Blog`
      description = `Search results for "${searchQuery}" on miiyuh's blog. Find articles about technology, design, photography, and more.`
    }
    
    if (category) {
      title = `${category.charAt(0).toUpperCase() + category.slice(1)} - miiyuh Blog`
      description = `Browse ${category} articles on miiyuh's blog. Discover insights, tutorials, and experiences.`
    }
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${baseUrl}/blog`,
        siteName: 'miiyuh',
        type: 'website',
        images: [
          {
            url: `${baseUrl}/assets/img/logo_miiyuh_text_white_v2.png`,
            width: 1200,
            height: 630,
            alt: 'miiyuh Blog',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`${baseUrl}/assets/img/logo_miiyuh_text_white_v2.png`],
      },
      alternates: {
        canonical: `${baseUrl}/blog`,
      },
    }
  }
  
  if (!post) {
    return {
      title: 'Post Not Found - miiyuh Blog',
      description: 'The requested blog post could not be found.',
    }
  }
  
  const title = `${post.title} - miiyuh Blog`
  const description = post.excerpt || `Read ${post.title} by ${post.author.name || post.author.email} on miiyuh's blog.`
  const url = `${baseUrl}/blog/${post.slug}`
  const publishedTime = new Date(post.publishedDate).toISOString()
  const modifiedTime = new Date(post.updatedAt).toISOString()
  
  const images = post.featuredImage 
    ? [
        {
          url: post.featuredImage.url.startsWith('http') 
            ? post.featuredImage.url 
            : `${baseUrl}${post.featuredImage.url}`,
          width: post.featuredImage.width || 1200,
          height: post.featuredImage.height || 630,
          alt: post.featuredImage.alt || post.title,
        },
      ]
    : [
        {
          url: `${baseUrl}/assets/img/logo_miiyuh_text_white_v2.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ]
  
  const keywords = [
    'miiyuh',
    'blog',
    ...(post.categories?.map(cat => cat.category) || []),
    ...(post.tags?.map(tag => tag.tag) || []),
  ]
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: post.author.name || post.author.email }],
    openGraph: {
      title,
      description,
      url,
      siteName: 'miiyuh',
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [post.author.name || post.author.email],
      section: post.categories?.[0]?.category,
      tags: post.tags?.map(tag => tag.tag),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map(img => img.url),
    },
    alternates: {
      canonical: url,
    },
    other: {
      'article:author': post.author.name || post.author.email,
      'article:published_time': publishedTime,
      'article:modified_time': modifiedTime,
      'article:section': post.categories?.[0]?.category || 'Blog',
      'article:tag': post.tags?.map(tag => tag.tag).join(', ') || '',
    },
  }
}

export function generateBlogJsonLd(post: BlogPost): object {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://miiyuh.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name || post.author.email,
      email: post.author.email,
    },
    publisher: {
      '@type': 'Organization',
      name: 'miiyuh',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/assets/img/logo_miiyuh_text_white_v2.png`,
      },
    },
    datePublished: new Date(post.publishedDate).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    image: post.featuredImage 
      ? {
          '@type': 'ImageObject',
          url: post.featuredImage.url.startsWith('http') 
            ? post.featuredImage.url 
            : `${baseUrl}${post.featuredImage.url}`,
          width: post.featuredImage.width || 1200,
          height: post.featuredImage.height || 630,
        }
      : {
          '@type': 'ImageObject',
          url: `${baseUrl}/assets/img/logo_miiyuh_text_white_v2.png`,
          width: 1200,
          height: 630,
        },
    url: `${baseUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    keywords: [
      ...(post.categories?.map(cat => cat.category) || []),
      ...(post.tags?.map(tag => tag.tag) || []),
    ].join(', '),
    articleSection: post.categories?.[0]?.category || 'Blog',
    wordCount: extractWordCount(post.content),
  }
}

function extractWordCount(content: Record<string, unknown>): number {
  // Simple word count estimation from content
  const extractText = (obj: unknown): string => {
    if (typeof obj === 'string') return obj
    if (typeof obj !== 'object' || obj === null) return ''
    
    const node = obj as Record<string, unknown>
    let text = ''
    if (typeof node.text === 'string') text += node.text
    if (node.children && Array.isArray(node.children)) {
      text += node.children.map(extractText).join(' ')
    }
    if (node.root && typeof node.root === 'object' && node.root !== null) {
      text += extractText(node.root)
    }
    return text
  }
  
  const text = extractText(content)
  return text.split(/\s+/).filter(word => word.length > 0).length
}
