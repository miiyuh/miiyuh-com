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
    
    // Search for the media by filename
    const mediaQuery = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: filename,
        },
      },
      limit: 1,
    })
    
    if (mediaQuery.docs.length > 0) {
      const mediaDoc = mediaQuery.docs[0]
      console.log('✅ Found media in PayloadCMS:', mediaDoc.filename, 'URL:', mediaDoc.url)
      
      // If we have a URL that includes Blob storage, redirect to it
      // Fixed pattern to match your Blob URL: https://tavt1iz2ukisuwtc.public.blob.vercel-storage.com/mikase.png
      if (mediaDoc.url && (mediaDoc.url.includes('.blob.vercel-storage.com') || mediaDoc.url.startsWith('http'))) {
        console.log('🔗 Redirecting to Blob URL:', mediaDoc.url)
        return NextResponse.redirect(mediaDoc.url, { status: 302 })
      }
      
      // Check for sized versions
      if (filename.includes('-') && mediaDoc.sizes) {
        const sizeMatch = filename.match(/-(\d+)x(\d+)\./)
        if (sizeMatch) {
          const width = parseInt(sizeMatch[1])
          const height = parseInt(sizeMatch[2])
          
          // Find matching size in the sizes object
          for (const [sizeName, sizeData] of Object.entries(mediaDoc.sizes)) {
            if (sizeData.width === width && sizeData.height === height && sizeData.url) {
              console.log('✅ Found matching size:', sizeName, sizeData.url)
              if (sizeData.url.includes('.blob.vercel-storage.com') || sizeData.url.startsWith('http')) {
                return NextResponse.redirect(sizeData.url, { status: 302 })
              }
            }
          }
        }
      }
    }
    
    console.log('⚠️ Media not found in PayloadCMS, trying local filesystem')
    
    // Fallback: Try to serve from local storage (development)
    try {
      const fs = await import('fs')
      const path = await import('path')
      
      const filePath = path.join(process.cwd(), 'media', filename)
      
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath)
        const mimeType = getMimeType(filename)

        console.log('✅ Serving from local filesystem:', filePath)
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': mimeType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        })
      }
    } catch (fsError) {
      console.log('⚠️ Filesystem access failed:', fsError)
    }
    
    console.error('❌ File not found:', filename)
    return new NextResponse('File not found', { status: 404 })
    
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
