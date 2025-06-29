import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params
  
  try {
    // In production with Vercel Blob, images should be served directly from Blob URLs
    // This endpoint is mainly for development or as a fallback
    
    // Try to serve from local storage (development)
    const fs = await import('fs')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'media', filename)
    
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)
    const mimeType = getMimeType(filename)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving media file:', error)
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
