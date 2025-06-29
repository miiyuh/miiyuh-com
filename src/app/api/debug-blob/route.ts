import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('🔍 Debug Blob: Checking Vercel Blob environment')
    
    const debugInfo: Record<string, unknown> = {
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL ? 'YES' : 'NO',
        VERCEL_URL: process.env.VERCEL_URL || 'NOT_SET',
        VERCEL_BRANCH_URL: process.env.VERCEL_BRANCH_URL || 'NOT_SET',
        VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL || 'NOT_SET',
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? `SET (${process.env.BLOB_READ_WRITE_TOKEN.substring(0, 20)}...)` : 'NOT_SET',
        DATABASE_URI: process.env.DATABASE_URI ? `SET (${process.env.DATABASE_URI.substring(0, 20)}...)` : 'NOT_SET',
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'SET' : 'NOT_SET',
        NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'NOT_SET',
      },
      runtime: {
        platform: process.platform,
        nodeVersion: process.version,
        arch: process.arch,
      }
    }
    
    // Test Vercel Blob connection if we have a token
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        // Import Vercel Blob dynamically
        const { list } = await import('@vercel/blob')
        
        console.log('🔍 Testing Vercel Blob connection...')
        const blobs = await list({
          token: process.env.BLOB_READ_WRITE_TOKEN,
          limit: 5,
        })
        
        debugInfo.blobStorage = {
          status: 'CONNECTED',
          totalBlobs: blobs.blobs.length,
          hasMore: blobs.hasMore,
          blobs: blobs.blobs.map(blob => ({
            url: blob.url,
            pathname: blob.pathname,
            size: blob.size,
            uploadedAt: blob.uploadedAt,
            isTargetImage: blob.pathname.includes('mikase.png'),
          })),
          mikaseImageFound: blobs.blobs.some(blob => blob.pathname.includes('mikase.png')),
        }
        
        console.log('✅ Vercel Blob connection successful')
      } catch (blobError) {
        console.error('❌ Vercel Blob connection failed:', blobError)
        debugInfo.blobStorage = {
          status: 'ERROR',
          error: blobError instanceof Error ? blobError.message : 'Unknown error'
        }
      }
    } else {
      debugInfo.blobStorage = {
        status: 'NO_TOKEN',
        message: 'BLOB_READ_WRITE_TOKEN not set'
      }
    }
    
    console.log('📊 Blob debug info:', JSON.stringify(debugInfo, null, 2))
    
    return NextResponse.json(debugInfo, { status: 200 })
  } catch (error) {
    console.error('❌ Debug Blob Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return NextResponse.json({
      error: errorMessage,
      stack: errorStack,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL ? 'YES' : 'NO',
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? 'SET' : 'NOT_SET',
      }
    }, { status: 500 })
  }
}
