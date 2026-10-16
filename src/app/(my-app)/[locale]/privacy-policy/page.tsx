import type { Metadata } from 'next'
import { isValidLocale, pageAlternates, resolveLocale } from '@/lib/locale'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Fragment } from 'react'
import { RefreshRouteOnSave } from '@/components/live-preview'
import { renderLexicalContent } from '@/utils/lexical-renderer'
import { extractTocFromLexical } from '@/utils/extract-toc'
import PrivacyPolicyClient from './privacy-policy-client'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return {
    title: 'privacy policy - miiyuh.com',
    description: 'how this website collects, uses, and protects your personal data when you visit it.',
    alternates: pageAlternates('/privacy-policy', locale),
  }
}

export const revalidate = 300

export default async function PrivacyPolicy({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params)
  const payload = await getPayload({ config })
  const privacyPolicy = await payload.findGlobal({
    slug: 'privacy-policy',
    locale,
  })

  const content = privacyPolicy.content
  const lastUpdated = privacyPolicy.lastUpdated
  const updatedAt = privacyPolicy.updatedAt

  // If content is empty, show a message
  if (!content) {
    return (
      <Fragment>
        <RefreshRouteOnSave />
        <PrivacyPolicyClient
          htmlContent="<div class='text-center p-8'><p class='text-lg'>Content not yet available. Please populate the Privacy Policy in the CMS admin at <a href='/admin' class='text-accent-hover underline'>/admin</a>.</p></div>"
          toc={[]}
          updatedAt={lastUpdated ?? updatedAt ?? undefined}
        />
      </Fragment>
    )
  }

  const htmlContent = renderLexicalContent(content)
  const toc = extractTocFromLexical(content)

  return (
    <Fragment>
      <RefreshRouteOnSave />
       <PrivacyPolicyClient htmlContent={htmlContent} toc={toc} updatedAt={lastUpdated ?? updatedAt ?? undefined} />
    </Fragment>
  )
}
