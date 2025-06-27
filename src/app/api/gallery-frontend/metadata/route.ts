import { getPayload } from 'payload'
import type { Where } from 'payload'
import configPromise from '../../../../../payload.config'
import type { Gallery } from '../../../../../payload-types'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    const whereClause: Where = {
      status: {
        equals: 'published',
      },
    }
    
    // Get all published gallery items to analyze metadata
    const galleries = await payload.find({
      collection: 'gallery',
      where: whereClause,
      limit: 1000, // High limit to get all items for metadata analysis
      select: {
        category: true,
        publishedDate: true,
      }
    })
    
    // Analyze the data to extract unique values
    const categories = new Set<string>()
    const years = new Set<number>()
    
    galleries.docs.forEach((item) => {
      if (item.category) categories.add(item.category)
      
      if (item.publishedDate) {
        years.add(new Date(item.publishedDate).getFullYear())
      }
    })
    
    return Response.json({
      success: true,
      data: {
        categories: Array.from(categories).sort(),
        years: Array.from(years).sort((a, b) => b - a), // Newest first
        totalItems: galleries.docs.length
      },
      source: 'payloadcms'
    })
  } catch (error) {
    console.error('Gallery Metadata API Error:', error)
    
    // Fallback metadata
    return Response.json({
      success: true,
      data: {
        categories: ['photography', 'artwork', 'digital-art'],
        years: [2025, 2024, 2023, 2022],
        totalItems: 0
      },
      source: 'fallback'
    })
  }
}
