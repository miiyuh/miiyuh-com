/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> => {
  try {
    return generatePageMetadata({ config, params, searchParams })
  } catch (error) {
    console.error('Error generating metadata:', error)
    return Promise.resolve({
      title: 'Admin - miiyuh.com CMS',
    })
  }
}

const Page = async ({ params, searchParams }: Args) => {
  try {
    const config = await import('@payload-config')
    if (!config) {
      throw new Error('Payload config failed to load')
    }
    return await RootPage({ config: config.default, params, searchParams, importMap })
  } catch (error) {
    // Re-throw Next.js redirect errors
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error
    }
    
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : ''
    
    console.error('Error rendering admin page:', errorMessage)
    console.error('Error stack:', errorStack)
    console.error('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URI_SET: !!process.env.DATABASE_URI,
      PAYLOAD_SECRET_SET: !!process.env.PAYLOAD_SECRET,
      PAYLOAD_URL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
    })
    
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Admin Panel - Error</h1>
        <p>Failed to load the admin interface. Check server logs for details.</p>
        <h3>Error Details:</h3>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '12px'
        }}>
          {errorMessage}
        </pre>
      </div>
    )
  }
}

export default Page