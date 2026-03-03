'use client'

import type { TOCItemType } from 'fumadocs-core/toc'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { PageTOC } from '@/components/ui/page-toc'

interface PrivacyPolicyClientProps {
    htmlContent: string
    toc: TOCItemType[]
    updatedAt?: string
}

export default function PrivacyPolicyClient({ htmlContent, toc, updatedAt }: PrivacyPolicyClientProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return null
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }

    return (
        <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen">
            <section className="relative grow px-6 md:px-12 lg:px-24 xl:px-32" style={{ paddingTop: '24px' }}>
                <div style={{ marginBottom: 'calc(var(--spacing) * 8)' }}>
                    <SimpleBreadcrumb
                        items={[
                            { label: 'home', href: '/' },
                            { label: 'privacy policy' },
                        ]}
                        className="mb-0"
                    />
                </div>

                <div className="mb-8">
                    <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-text-primary">
                        privacy policy
                    </h1>
                    {updatedAt && (
                        <p className="text-sm text-text-muted/60">
                            Last updated: {formatDate(updatedAt)}
                        </p>
                    )}
                </div>

                <div className="border-t border-white/8 pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
                        <div
                            className="text-base leading-relaxed text-text-secondary lexical-content prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                        {toc.length > 0 && (
                            <aside className="hidden lg:block">
                                <div className="sticky top-24">
                                    <PageTOC toc={toc} />
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}
