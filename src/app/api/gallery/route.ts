import { getPayload } from 'payload'
import configPromise from '../../../../payload.config'
import galleryData from '../../../../public/gallery.json'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    const galleries = await payload.find({
      collection: 'gallery',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
    })
    
    return Response.json({
      success: true,
      data: galleries.docs,
    })
  } catch (error) {
    console.error('Gallery API Error:', error)
    
    // Fallback to static gallery.json if PayloadCMS fails
    console.log('Falling back to static gallery data')
    return Response.json({
      success: true,
      data: galleryData,
      fallback: true,
    })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await request.json()
    
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
