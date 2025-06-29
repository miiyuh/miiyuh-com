import { NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '../../../../payload.config'

export async function GET() {
  try {
    console.log('🔍 Debug Gallery: Checking gallery collection and related media')
    
    // Get Payload instance
    const payload = await getPayloadHMR({ config })
    
    // Get all gallery albums
    const galleryQuery = await payload.find({
      collection: 'gallery',
      limit: 10,
      sort: '-createdAt',
    })
    
    // Get all media documents
    const mediaQuery = await payload.find({
      collection: 'media',
      limit: 10,
      sort: '-createdAt',
    })
    
    const debugInfo = {
      gallery: {
        totalDocs: galleryQuery.totalDocs,
        docs: galleryQuery.docs.map(doc => ({
          id: doc.id,
          title: doc.title,
          category: doc.category,
          status: doc.status,
          createdAt: doc.createdAt,
          imagesCount: doc.images?.length || 0,
          firstImage: doc.images?.[0] ? {
            id: doc.images[0].id,
            caption: doc.images[0].caption,
            imageId: typeof doc.images[0].image === 'string' ? doc.images[0].image : doc.images[0].image?.id,
            imageFilename: typeof doc.images[0].image === 'object' ? doc.images[0].image?.filename : 'string_reference',
          } : null,
        }))
      },
      media: {
        totalDocs: mediaQuery.totalDocs,
        docs: mediaQuery.docs.map(doc => ({
          id: doc.id,
          filename: doc.filename,
          url: doc.url,
          urlType: doc.url ? (
            doc.url.includes('.blob.vercel-storage.com') ? 'BLOB_URL' :
            doc.url.includes('/api/media/file/') ? 'PROXY_URL' :
            doc.url.startsWith('http') ? 'ABSOLUTE_URL' : 'RELATIVE_URL'
          ) : 'NO_URL',
          createdAt: doc.createdAt,
          hasSizes: !!doc.sizes,
          sizesCount: doc.sizes ? Object.keys(doc.sizes).length : 0,
        }))
      },
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL ? 'YES' : 'NO',
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? 'SET' : 'NOT_SET',
      }
    }
    
    console.log('📊 Gallery debug info:', JSON.stringify(debugInfo, null, 2))
    
    return NextResponse.json(debugInfo, { status: 200 })
  } catch (error) {
    console.error('❌ Debug Gallery Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json({
      error: errorMessage,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL ? 'YES' : 'NO',
      }
    }, { status: 500 })
  }
}
