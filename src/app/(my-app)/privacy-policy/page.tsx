import { getPayload } from 'payload'
import config from '@payload-config'
import { Fragment } from 'react'
import { RefreshRouteOnSave } from '@/components/live-preview'
import { renderLexicalContent } from '@/utils/lexical-renderer'
import { extractTocFromLexical } from '@/utils/extract-toc'
import PrivacyPolicyClient from './privacy-policy-client'

export const dynamic = 'force-dynamic'

export default async function PrivacyPolicy() {
  const payload = await getPayload({ config })
  const privacyPolicy = await payload.findGlobal({
    slug: 'privacy-policy',
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
          htmlContent="<div class='text-center p-8'><p class='text-lg'>Content not yet available. Please populate the Privacy Policy in the CMS admin at <a href='/admin' class='text-accent-primary underline'>/admin</a>.</p></div>"
          toc={[]}
          updatedAt={lastUpdated || updatedAt}
        />
      </Fragment>
    )
  }

  const htmlContent = renderLexicalContent(content)
  const toc = extractTocFromLexical(content)

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <PrivacyPolicyClient htmlContent={htmlContent} toc={toc} updatedAt={lastUpdated || updatedAt} />
    </Fragment>
  )
}
