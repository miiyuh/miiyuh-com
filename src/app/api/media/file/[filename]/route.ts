import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '../../../../../../payload.config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params
  
  try {
    console.log('🔍 Media proxy request for:', filename)
    
    // Get Payload instance
    const payload = await getPayloadHMR({ config })
    
    // Extract base filename (without size suffix)
    // e.g., "2025_japan-trip_01-1024x1024.jpg" -> "2025_japan-trip_01.jpg"
    const baseFilename = filename.replace(/-\d+x\d+\./, '.')
    console.log('🔍 Looking for base filename:', baseFilename)
    
    // Try to find the media by base filename in PayloadCMS
    const mediaQuery = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: baseFilename,
        },
      },
      limit: 1,
    })
    
    if (mediaQuery.docs.length > 0) {
      const mediaDoc = mediaQuery.docs[0]
      console.log('✅ Found media in PayloadCMS:', mediaDoc.filename)
      
      // Check if this is a sized version
      if (filename !== baseFilename) {
        // This is a sized version, look for it in the sizes object
        const sizeMatch = filename.match(/-(\d+)x(\d+)\./)
        if (sizeMatch) {
          const width = sizeMatch[1]
          const height = sizeMatch[2]
          console.log('🔍 Looking for size:', `${width}x${height}`)
          
          // Find matching size in the sizes object
          if (mediaDoc.sizes) {
            for (const [sizeName, sizeData] of Object.entries(mediaDoc.sizes)) {
              if (sizeData.width === parseInt(width) && sizeData.height === parseInt(height)) {
                console.log('✅ Found matching size:', sizeName, sizeData.url)
                if (sizeData.url) {
                  // If it's a Blob URL, redirect to it
                  if (sizeData.url.includes('blob.vercel-storage.com')) {
                    return NextResponse.redirect(sizeData.url, { status: 302 })
                  }
                  // If it's a relative URL (like /api/media/file/...), break and fall through to filesystem
                  if (sizeData.url.startsWith('/api/media/file/')) {
                    console.log('🔄 Relative URL detected, falling through to filesystem')
                    break
                  }
                  // Otherwise, try to construct absolute URL
                  const request_url = new URL(request.url)
                  const absoluteUrl = new URL(sizeData.url, `${request_url.protocol}//${request_url.host}`)
                  return NextResponse.redirect(absoluteUrl.toString(), { status: 302 })
                }
              }
            }
          }
        }
      } else {
        // This is the original image
        if (mediaDoc.url) {
          console.log('🔗 Redirecting to original Blob URL:', mediaDoc.url)
          // If it's a Blob URL, redirect to it
          if (mediaDoc.url.includes('blob.vercel-storage.com')) {
            return NextResponse.redirect(mediaDoc.url, { status: 302 })
          }
          // If it's a relative URL (like /api/media/file/...), fall through to filesystem
          if (mediaDoc.url.startsWith('/api/media/file/')) {
            console.log('🔄 Relative URL detected, falling through to filesystem')
          } else {
            // Otherwise, try to construct absolute URL
            const request_url = new URL(request.url)
            const absoluteUrl = new URL(mediaDoc.url, `${request_url.protocol}//${request_url.host}`)
            return NextResponse.redirect(absoluteUrl.toString(), { status: 302 })
          }
        }
      }
    }
    
    console.log('⚠️ Media not found in PayloadCMS, trying local filesystem')
    
    // Fallback: Try to serve from local storage (development)
    const fs = await import('fs')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'media', filename)
    
    if (!fs.existsSync(filePath)) {
      console.error('❌ File not found in local storage:', filePath)
      return new NextResponse('File not found', { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)
    const mimeType = getMimeType(filename)

    console.log('✅ Serving from local filesystem:', filePath)
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('❌ Error in media proxy:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'gif':
      return 'image/gif'
    case 'webp':
      return 'image/webp'
    case 'svg':
      return 'image/svg+xml'
    default:
      return 'application/octet-stream'
  }
}
