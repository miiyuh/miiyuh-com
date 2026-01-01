'use client'

import type { TOCItemType } from 'fumadocs-core/toc'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { Separator } from '@/components/ui/separator'
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
        <main className="flex flex-col text-[#FAF3E0] font-sans relative min-h-screen">
            <div className="relative grow flex px-6 py-12 min-h-screen max-w-7xl mx-auto gap-8 w-full">
                <section className="flex-1 max-w-4xl">
                    <SimpleBreadcrumb
                        items={[
                            { label: 'home', href: '/' },
                            { label: 'privacy policy' },
                        ]}
                        className="mb-16"
                    />
                    <div className="prose prose-invert max-w-none font-noto-serif-jp">
                        <h2 className="text-4xl font-bold tracking-tight font-serif mb-3 text-[#FAF3E0]">privacy policy</h2>
                        {updatedAt && (
                            <p className="text-sm text-[#FAF3E0]/60 mb-6">
                                Last updated: {formatDate(updatedAt)}
                            </p>
                        )}
                        <Separator className="my-8 bg-white/10" />
                        <div
                            className="text-lg leading-relaxed text-[#FAF3E0]/90 lexical-content"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    </div>
                </section>
                <div className="hidden lg:block w-px bg-white/10" />
                <aside className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-24">
                        <PageTOC toc={toc} />
                    </div>
                </aside>
            </div>
        </main>
    )
}
