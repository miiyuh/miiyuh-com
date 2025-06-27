import { getPayload } from 'payload'
import type { Where } from 'payload'
import configPromise from '../../../../../payload.config'
import type { Gallery } from '../../../../../payload-types'

// Types for gallery data structure
interface PayloadImage {
  id: string
  alt: string
  caption?: string
  filename: string
  mimeType: string
  url?: string
  width?: number
  height?: number
  sizes?: {
    thumbnail?: { url: string, width: number, height: number }
    card?: { url: string, width: number, height: number }
    tablet?: { url: string, width: number, height: number }
  }
}

interface GalleryImage {
  src: string
  title?: string
  description?: string
}

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const featured = searchParams.get('featured')
    
    const payload = await getPayload({ config: configPromise })
    
    // Build where clause
    const whereClause: Where = {
      status: {
        equals: 'published',
      },
      category: {
        equals: params.category,
      },
    }
    
    // Add year filter if provided
    if (year) {
      const startOfYear = new Date(`${year}-01-01`)
      const endOfYear = new Date(`${year}-12-31`)
      whereClause.publishedDate = {
        greater_than_equal: startOfYear,
        less_than_equal: endOfYear,
      }
    }
    
    // Add featured filter if provided
    if (featured === 'true') {
      whereClause.featured = {
        equals: true,
      }
    }
    
    const galleries = await payload.find({
      collection: 'gallery',
      where: whereClause,
      sort: '-publishedDate',
      depth: 2, // Include related media
    })
    
    // Format data for frontend
    const formattedImages: GalleryImage[] = []
    
    galleries.docs.forEach((item: Gallery) => {
      if (!item.images || !Array.isArray(item.images)) return
      
      item.images.forEach(imageItem => {
        if (typeof imageItem === 'object' && imageItem !== null && 'image' in imageItem) {
          const image = imageItem.image
          if (typeof image === 'object' && image !== null && 'filename' in image) {
            formattedImages.push({
              src: (image as PayloadImage).url || `/media/${(image as PayloadImage).filename}`,
              title: (imageItem as { caption?: string }).caption || item.title || 'Untitled',
              description: item.description || (imageItem as { caption?: string }).caption || undefined
            })
          }
        }
      })
    })
    
    return Response.json({
      success: true,
      data: formattedImages,
      category: params.category,
      year: year || 'all',
      featured: featured === 'true',
      total: formattedImages.length,
      source: 'payloadcms'
    })
  } catch (error) {
    console.error('Gallery Category API Error:', error)
    return Response.json(
      { 
        success: false, 
        error: 'Failed to fetch gallery data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
