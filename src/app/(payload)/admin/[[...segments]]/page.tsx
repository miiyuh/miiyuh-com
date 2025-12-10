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
    return {
      title: 'Admin - miiyuh.com CMS',
    }
  }
}

const Page = async ({ params, searchParams }: Args) => {
  try {
    return await RootPage({ config, params, searchParams, importMap })
  } catch (error) {
    console.error('Error rendering admin page:', error)
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Admin Panel - Error</h1>
        <p>Failed to load the admin interface. Please check the server logs.</p>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    )
  }
}

export default Page