import { NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '../../../../payload.config'

export async function GET() {
  try {
    console.log('🔍 Debug Media: Checking PayloadCMS media collection')
    
    // Get Payload instance
    const payload = await getPayloadHMR({ config })
    
    // Get all media documents
    const mediaQuery = await payload.find({
      collection: 'media',
      limit: 10, // Limit to recent 10 items
      sort: '-createdAt',
    })
    
    const debugInfo = {
      totalDocs: mediaQuery.totalDocs,
      docs: mediaQuery.docs.map(doc => ({
        id: doc.id,
        filename: doc.filename,
        url: doc.url,
        createdAt: doc.createdAt,
        sizes: doc.sizes ? [
          doc.sizes.thumbnail && { name: 'thumbnail', ...doc.sizes.thumbnail },
          doc.sizes.card && { name: 'card', ...doc.sizes.card },
          doc.sizes.tablet && { name: 'tablet', ...doc.sizes.tablet },
        ].filter(Boolean) : [],
      })),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URI: process.env.DATABASE_URI ? 'SET' : 'NOT_SET',
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? 'SET' : 'NOT_SET',
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'SET' : 'NOT_SET',
        NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'NOT_SET',
        VERCEL: process.env.VERCEL ? 'YES' : 'NO',
        VERCEL_URL: process.env.VERCEL_URL || 'NOT_SET',
        VERCEL_BRANCH_URL: process.env.VERCEL_BRANCH_URL || 'NOT_SET',
        VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL || 'NOT_SET',
      }
    }
    
    console.log('📊 Debug info:', JSON.stringify(debugInfo, null, 2))
    
    return NextResponse.json(debugInfo, { status: 200 })
  } catch (error) {
    console.error('❌ Debug Media Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return NextResponse.json({
      error: errorMessage,
      stack: errorStack,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URI: process.env.DATABASE_URI ? 'SET' : 'NOT_SET',
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? 'SET' : 'NOT_SET',
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'SET' : 'NOT_SET',
        NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'NOT_SET',
        VERCEL: process.env.VERCEL ? 'YES' : 'NO',
      }
    }, { status: 500 })
  }
}
