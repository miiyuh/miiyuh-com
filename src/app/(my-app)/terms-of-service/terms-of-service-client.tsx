'use client'

import { useRef } from 'react'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { Separator } from '@/components/ui/separator'

interface TermsOfServiceClientProps {
    htmlContent: string
    updatedAt?: string
}

export default function TermsOfServiceClient({ htmlContent, updatedAt }: TermsOfServiceClientProps) {
    const contentRef = useRef<HTMLDivElement>(null)

    const formatDate = (dateString?: string) => {
        if (!dateString) return null
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }

    return (
        <main className="flex flex-col text-[#FAF3E0] font-sans relative min-h-screen">
            <div className="relative flex-grow flex px-6 py-12 min-h-screen max-w-7xl mx-auto gap-8 w-full">
                <section className="flex-1 max-w-4xl">
                    <SimpleBreadcrumb
                        items={[
                            { label: 'home', href: '/' },
                            { label: 'terms of service' },
                        ]}
                        className="mb-16"
                    />
                    <div className="prose prose-invert max-w-none font-noto-serif-jp">
                        <h2 className="text-4xl font-bold tracking-tight font-serif mb-3 text-[#FAF3E0]">terms of service</h2>
                        {updatedAt && (
                            <p className="text-sm text-[#FAF3E0]/60 mb-6">
                                Last updated: {formatDate(updatedAt)}
                            </p>
                        )}
                        <Separator className="my-8 bg-white/10 h-[2px]" />
                        <div
                            ref={contentRef}
                            className="text-lg leading-relaxed text-[#FAF3E0]/90 lexical-content"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    </div>
                </section>
                <Separator className="hidden lg:block bg-white/10 h-0.5" orientation="vertical" />
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <TableOfContents contentRef={contentRef} />
                    </div>
                </aside>
            </div>
        </main>
    )
}
