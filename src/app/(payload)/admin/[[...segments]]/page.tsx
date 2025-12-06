import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage } from '@payloadcms/next/views'

import { importMap } from '../importMap'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin',
}

type Args = {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: Args) {
  const params = await paramsPromise
  const searchParams = await searchParamsPromise

  const segments = Array.isArray(params?.segments) ? params.segments : []
  const safeSearchParams = Object.fromEntries(
    Object.entries(searchParams ?? {}).filter(([, value]) => value !== undefined),
  ) as Record<string, string | string[]>

  return RootPage({
    config,
    importMap,
    params: Promise.resolve({ segments }),
    searchParams: Promise.resolve(safeSearchParams),
  })
}
