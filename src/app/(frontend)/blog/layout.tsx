import { Metadata } from 'next'
import { generateBlogMetadata } from '@/utils/seo'

export const metadata: Metadata = generateBlogMetadata({ isListPage: true })

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
