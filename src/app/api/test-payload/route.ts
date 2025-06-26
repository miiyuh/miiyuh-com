import { getPayload } from 'payload'
import configPromise from '../../../../payload.config'

export async function GET() {
  try {
    // Test basic PayloadCMS connection without querying collections
    await getPayload({ config: configPromise })
    
    return Response.json({ 
      success: true, 
      message: 'PayloadCMS connected successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('PayloadCMS connection error:', error)
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
