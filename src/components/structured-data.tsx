'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface StructuredDataProps {
  type?: 'website' | 'person' | 'creativework' | 'blogposting'
  title?: string
  description?: string
  image?: string
  author?: string
  datePublished?: string
  dateModified?: string
}

const generateStructuredData = (props: StructuredDataProps & { url: string }) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': props.type === 'website' ? 'WebSite' : 
             props.type === 'person' ? 'Person' :
             props.type === 'creativework' ? 'CreativeWork' :
             props.type === 'blogposting' ? 'BlogPosting' : 'WebPage',
    name: props.title || "miiyuh's webpage",
    description: props.description || 'hello, and welcome to my webpage!',
    url: props.url,
    image: props.image || '/assets/img/logo_miiyuh_text_white_v2.png',
    author: {
      '@type': 'Person',
      name: props.author || 'miiyuh',
      url: 'https://miiyuh.com'
    }
  }

  if (props.type === 'website') {
    return {
      ...baseData,
      '@type': 'WebSite',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://miiyuh.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      mainEntity: {
        '@type': 'Person',
        name: 'miiyuh',
        jobTitle: 'Creative Developer',
        url: 'https://miiyuh.com',
        sameAs: [
          'https://github.com/miiyuh',
          'https://instagram.com/miiyuh',
          'https://twitter.com/miiyuh'
        ]
      }
    }
  }

  if (props.type === 'creativework') {
    return {
      ...baseData,
      '@type': 'CreativeWork',
      creator: baseData.author,
      genre: ['Photography', 'Digital Art', 'Web Development'],
      keywords: ['photography', 'artwork', 'digital art', 'creative', 'portfolio']
    }
  }

  if (props.type === 'blogposting') {
    return {
      ...baseData,
      '@type': 'BlogPosting',
      headline: props.title,
      datePublished: props.datePublished,
      dateModified: props.dateModified || props.datePublished,
      publisher: {
        '@type': 'Person',
        name: 'miiyuh',
        url: 'https://miiyuh.com'
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': props.url
      }
    }
  }

  return baseData
}

export const StructuredData = (props: StructuredDataProps) => {
  const pathname = usePathname()
  
  useEffect(() => {
    const url = `https://miiyuh.com${pathname}`
    const structuredData = generateStructuredData({ ...props, url })
    
    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }
    
    // Add new structured data
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)
    
    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [pathname, props])

  return null
}

// SEO utility functions
export const generatePageTitle = (pageTitle?: string) => {
  const baseTitle = "miiyuh's webpage"
  return pageTitle ? `${pageTitle} | ${baseTitle}` : baseTitle
}

export const generatePageDescription = (pageDescription?: string) => {
  return pageDescription || 'hello, and welcome to my webpage! explore my photography, artwork, blog posts, and more.'
}

export const generateCanonicalUrl = (pathname: string) => {
  return `https://miiyuh.com${pathname}`
}

// Open Graph utilities
export const generateOGImage = (title: string, description?: string) => {
  // In a real implementation, this would generate dynamic OG images
  const params = new URLSearchParams({
    title: title,
    description: description || '',
    theme: 'dark'
  })
  return `/api/og?${params.toString()}`
}

// Breadcrumb structured data
export const generateBreadcrumbData = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://miiyuh.com${crumb.url}`
    }))
  }
}
