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
    
    // Try multiple search strategies
    let mediaDoc = null
    
    // Strategy 1: Search by exact filename match
    let mediaQuery = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: filename,
        },
      },
      limit: 1,
    })
    
    if (mediaQuery.docs.length > 0) {
      mediaDoc = mediaQuery.docs[0]
      console.log('✅ Found media by exact filename:', mediaDoc.filename)
    } else {
      // Strategy 2: Search by base filename if different
      if (baseFilename !== filename) {
        mediaQuery = await payload.find({
          collection: 'media',
          where: {
            filename: {
              equals: baseFilename,
            },
          },
          limit: 1,
        })
        
        if (mediaQuery.docs.length > 0) {
          mediaDoc = mediaQuery.docs[0]
          console.log('✅ Found media by base filename:', mediaDoc.filename)
        }
      }
    }
    
    if (mediaDoc) {
    if (mediaDoc) {
      console.log('✅ Found media in PayloadCMS:', mediaDoc.filename, 'URL:', mediaDoc.url)
      
      // For the original image (no size suffix), return the main URL
      if (filename === mediaDoc.filename && mediaDoc.url) {
        console.log('🔗 Redirecting to original image URL:', mediaDoc.url)
        // Direct redirect to Blob URL or any other URL
        if (mediaDoc.url.includes('.blob.vercel-storage.com')) {
          return NextResponse.redirect(mediaDoc.url, { status: 302 })
        }
        // Handle other absolute URLs
        if (mediaDoc.url.startsWith('http')) {
          return NextResponse.redirect(mediaDoc.url, { status: 302 })
        }
      }
      
      // Check if this is a sized version
      if (filename !== mediaDoc.filename && filename.includes('-')) {
        // This might be a sized version, look for it in the sizes object
        const sizeMatch = filename.match(/-(\d+)x(\d+)\./)
        if (sizeMatch && mediaDoc.sizes) {
          const width = parseInt(sizeMatch[1])
          const height = parseInt(sizeMatch[2])
          console.log('🔍 Looking for size:', `${width}x${height}`)
          
          // Find matching size in the sizes object
          for (const [sizeName, sizeData] of Object.entries(mediaDoc.sizes)) {
            if (sizeData.width === width && sizeData.height === height) {
              console.log('✅ Found matching size:', sizeName, sizeData.url)
              if (sizeData.url) {
                // Direct redirect to Blob URL or any other URL
                if (sizeData.url.includes('.blob.vercel-storage.com')) {
                  return NextResponse.redirect(sizeData.url, { status: 302 })
                }
                // Handle other absolute URLs
                if (sizeData.url.startsWith('http')) {
                  return NextResponse.redirect(sizeData.url, { status: 302 })
                }
                // If it's a relative URL (like /api/media/file/...), break and fall through
                if (sizeData.url.startsWith('/api/media/file/')) {
                  console.log('🔄 Relative URL detected, falling through to filesystem')
                  break
                }
              }
            }
          }
        }
      }
      
      // If we have a direct Blob URL for the original image, use it
      if (mediaDoc.url && mediaDoc.url.includes('.blob.vercel-storage.com')) {
        console.log('� Fallback: Redirecting to Blob URL:', mediaDoc.url)
        return NextResponse.redirect(mediaDoc.url, { status: 302 })
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
