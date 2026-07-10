/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import localFont from 'next/font/local'
import { Noto_Sans } from 'next/font/google'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const stackSansText = localFont({
  src: '../../assets/fonts/StackSansText-VariableFont_wght.ttf',
  variable: '--font-stack-sans-text',
  display: 'swap',
})

const stackSansNotch = localFont({
  src: '../../assets/fonts/StackSansNotch-VariableFont_wght.ttf',
  variable: '--font-stack-sans-notch',
  display: 'swap',
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <div
      className={`${stackSansText.variable} ${stackSansNotch.variable} ${notoSans.variable}`}
      style={{ fontFamily: 'var(--font-stack-sans-text), sans-serif' }}
    >
      {children}
    </div>
  </RootLayout>
)

export default Layout
