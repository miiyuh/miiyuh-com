import { getPayload } from 'payload'
import config from '@payload-config'
import { renderLexicalContent } from '@/utils/lexical-renderer'
import PrivacyPolicyClient from './privacy-policy-client'

export const dynamic = 'force-dynamic'

export default async function PrivacyPolicy() {
  const payload = await getPayload({ config })
  const legalPages = await payload.findGlobal({
    slug: 'legal-pages',
  })

  const content = legalPages.privacyPolicy
  const updatedAt = legalPages.updatedAt

  // If content is empty, show a message
  if (!content) {
    return (
      <PrivacyPolicyClient
        htmlContent="<div class='text-center p-8'><p class='text-lg'>Content not yet available. Please populate the Privacy Policy in the CMS admin at <a href='/admin' class='text-accent-primary underline'>/admin</a>.</p></div>"
        updatedAt={updatedAt}
      />
    )
  }

  const htmlContent = renderLexicalContent(content)

  return (
    <PrivacyPolicyClient htmlContent={htmlContent} updatedAt={updatedAt} />
  )
}
