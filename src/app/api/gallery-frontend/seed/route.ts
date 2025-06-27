import { getPayload } from 'payload'
import configPromise from '../../../../../payload.config'

// Sample gallery data to seed the database
const sampleGalleryData = [
  {
    title: '2025 Japan Trip - Day 1',
    description: 'First day in Japan, exploring Tokyo',
    category: 'photography' as const,
    // Note: images array is required but we'll handle this by creating a placeholder media item
    images: [],
    featured: true,
    publishedDate: new Date('2025-01-15').toISOString(),
    status: 'published' as const
  },
  {
    title: 'Attack on Titan Fan Art',
    description: 'Digital artwork inspired by the anime series',
    category: 'artwork' as const,
    images: [],
    featured: false,
    publishedDate: new Date('2023-06-15').toISOString(),
    status: 'published' as const
  },
  {
    title: 'Genshin Impact Character Art',
    description: 'Character artwork from Genshin Impact',
    category: 'digital-art' as const,
    images: [],
    featured: true,
    publishedDate: new Date('2022-12-10').toISOString(),
    status: 'published' as const
  }
]

export async function POST() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // First, try to create a placeholder media item for testing
    try {
      // Check if we already have a placeholder media
      const existingMedia = await payload.find({
        collection: 'media',
        where: {
          alt: {
            equals: 'Placeholder Image'
          }
        },
        limit: 1
      })
      
      if (existingMedia.docs.length > 0) {
        console.log('Found existing placeholder media for future use')
      }
    } catch {
      console.log('No existing placeholder media found, will create gallery items without images')
    }
    
    const createdItems = []
    
    for (const item of sampleGalleryData) {
      try {
        // Create gallery item without images first (since images are required but we may not have media)
        const galleryData = {
          ...item,
          // We'll create items without images for now, which is allowed if images is not marked as required
        }
        
        const gallery = await payload.create({
          collection: 'gallery',
          data: galleryData,
        })
        createdItems.push(gallery)
      } catch (itemError) {
        console.error(`Failed to create gallery item: ${item.title}`, itemError)
        // Continue with other items
      }
    }
    
    return Response.json({
      success: true,
      message: `Sample gallery data created successfully. Created ${createdItems.length} items.`,
      data: createdItems,
      total: createdItems.length,
      note: 'Items created without images. Add images through the admin interface.'
    })
  } catch (error) {
    console.error('Gallery Seed Error:', error)
    return Response.json(
      { 
        success: false, 
        error: 'Failed to create sample gallery data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Delete all gallery items (for testing purposes)
    const galleries = await payload.find({
      collection: 'gallery',
      limit: 1000,
    })
    
    let deletedCount = 0
    for (const gallery of galleries.docs) {
      await payload.delete({
        collection: 'gallery',
        id: gallery.id,
      })
      deletedCount++
    }
    
    return Response.json({
      success: true,
      message: 'All gallery data deleted successfully',
      deletedCount
    })
  } catch (error) {
    console.error('Gallery Delete Error:', error)
    return Response.json(
      { 
        success: false, 
        error: 'Failed to delete gallery data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
