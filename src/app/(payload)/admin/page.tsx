import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage } from '@payloadcms/next/views'

import { importMap } from './importMap'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin',
}

export default async function Page() {
  return RootPage({
    config,
    importMap,
    params: Promise.resolve({}),
    searchParams: Promise.resolve({}),
  })
}

