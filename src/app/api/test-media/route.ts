import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '../../../../payload.config'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get('filename') || 'mikase.png'
  
  try {
    console.log('🔍 Testing specific media file:', filename)
    
    // Get Payload instance
    const payload = await getPayloadHMR({ config })
    
    // Try to find the media by filename
    const mediaQuery = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: filename,
        },
      },
      limit: 1,
    })
    
    const debugInfo = {
      filename,
      found: mediaQuery.docs.length > 0,
      totalDocs: mediaQuery.totalDocs,
      media: mediaQuery.docs.length > 0 ? {
        id: mediaQuery.docs[0].id,
        filename: mediaQuery.docs[0].filename,
        url: mediaQuery.docs[0].url,
        alt: mediaQuery.docs[0].alt,
        sizes: mediaQuery.docs[0].sizes,
        mimeType: mediaQuery.docs[0].mimeType,
        filesize: mediaQuery.docs[0].filesize,
        width: mediaQuery.docs[0].width,
        height: mediaQuery.docs[0].height,
      } : null,
      expectedProxyUrl: `/api/media/file/${filename}`,
      testDirectAccess: mediaQuery.docs.length > 0 ? mediaQuery.docs[0].url : null,
    }
    
    console.log('📊 Media test result:', JSON.stringify(debugInfo, null, 2))
    
    return NextResponse.json(debugInfo, { status: 200 })
  } catch (error) {
    console.error('❌ Media test error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      filename,
    }, { status: 500 })
  }
}
