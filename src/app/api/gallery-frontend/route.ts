import { getPayload } from 'payload'
import type { Where } from 'payload'
import configPromise from '../../../../payload.config'
import type { Gallery } from '../../../../payload-types'
import galleryData from '../../../../public/gallery.json'

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

interface FormattedGalleryData {
  photos_2025jp?: GalleryImage[]
  artworks_2022?: GalleryImage[]
  artworks_2023?: GalleryImage[]
}

// Helper function to format PayloadCMS data to match existing frontend structure
function formatGalleryData(payloadData: Gallery[]): FormattedGalleryData {
  const formatted: FormattedGalleryData = {}
  
  // Group items by category and year (if applicable)
  payloadData.forEach(item => {
    if (!item.images || !Array.isArray(item.images)) return
    
    const year = item.publishedDate ? new Date(item.publishedDate).getFullYear() : new Date().getFullYear()
    
    // Convert PayloadCMS images to the expected format
    const formattedImages: GalleryImage[] = []
    
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
    
    // Categorize based on category and year
    if (item.category === 'photography') {
      if (year === 2025) {
        if (!formatted.photos_2025jp) formatted.photos_2025jp = []
        formatted.photos_2025jp.push(...formattedImages)
      }
      // Add more year conditions as needed
    } else if (item.category === 'artwork' || item.category === 'digital-art') {
      if (year === 2022) {
        if (!formatted.artworks_2022) formatted.artworks_2022 = []
        formatted.artworks_2022.push(...formattedImages)
      } else if (year === 2023) {
        if (!formatted.artworks_2023) formatted.artworks_2023 = []
        formatted.artworks_2023.push(...formattedImages)
      }
    }
  })
  
  return formatted
}

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    const whereClause: Where = {
      status: {
        equals: 'published',
      },
    }
    
    const galleries = await payload.find({
      collection: 'gallery',
      where: whereClause,
      sort: '-publishedDate',
      depth: 2, // Include related media
    })
    
    // Format data to match existing frontend structure
    const formattedData = formatGalleryData(galleries.docs as Gallery[])
    
    return Response.json({
      success: true,
      data: formattedData,
      source: 'payloadcms',
      total: galleries.docs.length
    })
  } catch (error) {
    console.error('Gallery API Error:', error)
    
    // Fallback to static gallery.json if PayloadCMS fails
    console.log('Falling back to static gallery data')
    return Response.json({
      success: true,
      data: galleryData,
      source: 'fallback',
      fallback: true,
    })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Check if request has content
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return Response.json(
        { 
          success: false, 
          error: 'Invalid content type. Expected application/json',
        },
        { status: 400 }
      )
    }
    
    let body
    try {
      const rawBody = await request.text()
      if (!rawBody || rawBody.trim() === '') {
        return Response.json(
          { 
            success: false, 
            error: 'Empty request body',
          },
          { status: 400 }
        )
      }
      
      body = JSON.parse(rawBody)
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      return Response.json(
        { 
          success: false, 
          error: 'Invalid JSON in request body',
          details: parseError instanceof Error ? parseError.message : 'Unknown parse error'
        },
        { status: 400 }
      )
    }
    
    // Validate required fields
    if (!body.title) {
      return Response.json(
        { 
          success: false, 
          error: 'Title is required',
        },
        { status: 400 }
      )
    }
    
    const gallery = await payload.create({
      collection: 'gallery',
      data: body,
    })
    
    return Response.json({
      success: true,
      data: gallery,
    })
  } catch (error) {
    console.error('Gallery POST Error:', error)
    return Response.json(
      { 
        success: false, 
        error: 'Failed to create gallery',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
