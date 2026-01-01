/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  try {
    return handleServerFunctions({
      ...args,
      config,
      importMap,
    })
  } catch (error) {
    console.error('[Payload] Server function error:', error)
    throw error
  }
}

const Layout = ({ children }: Args) => {
  if (!config) {
    console.error('[Payload] Config not loaded')
    return (
      <html>
        <body>
          <div style={{ padding: '20px' }}>
            <h1>Configuration Error</h1>
            <p>Payload CMS configuration failed to load.</p>
          </div>
        </body>
      </html>
    )
  }

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

export default Layout
