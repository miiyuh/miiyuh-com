import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const diagnostics = {
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      vercel: !!process.env.VERCEL,
      env_vars: {
        DATABASE_URI: !!process.env.DATABASE_URI,
        PAYLOAD_SECRET: !!process.env.PAYLOAD_SECRET,
        BLOB_READ_WRITE_TOKEN: !!process.env.BLOB_READ_WRITE_TOKEN,
        NEXT_PUBLIC_PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
      },
      payload_config: {
        config_exists: true, // We'll update this if we can import the config
      } as Record<string, unknown>
    }

    // Try to test database connection
    try {
      const { getPayloadHMR } = await import('@payloadcms/next/utilities')
      const configPromise = await import('../../../../payload.config')
      
      const payload = await getPayloadHMR({ config: configPromise.default })
      
      // Try a simple query to test the connection
      const testQuery = await payload.find({
        collection: 'users',
        limit: 1,
      })
      
      diagnostics.payload_config = {
        config_exists: true,
        payload_initialized: true,
        database_connected: true,
        test_query_results: testQuery.totalDocs,
      }
    } catch (error) {
      diagnostics.payload_config = {
        config_exists: true,
        payload_initialized: false,
        database_connected: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }

    return NextResponse.json(diagnostics)
  } catch (error) {
    return NextResponse.json({
      error: 'Diagnostic failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}
