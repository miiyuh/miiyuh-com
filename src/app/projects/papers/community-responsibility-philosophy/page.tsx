'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

const paperData = {
  title: 'Individual Growth and Collective Responsibility: A Philosophy for Modern Community Building',
  author: 'miiyuh',
  year: '2024',
  abstract: 'Drawing inspiration from philosophical works and narratives like Attack on Titan and Vinland Saga, this paper explores the tension between personal autonomy and community responsibility. It examines how individuals can maintain their independence while supporting those around them, the ethics of change and adaptation, and the philosophical foundations of building better communities. The research addresses questions of meaning, responsibility, and growth in the context of modern social challenges, exploring how we can stand on our own feet while lifting others up. The study investigates the balance between self-preservation and collective welfare, informed by both classical philosophy and contemporary storytelling that challenges our understanding of freedom, responsibility, and community.',
  keywords: ['Philosophy', 'Community Ethics', 'Personal Growth', 'Social Responsibility', 'Meaning', 'Collective Action'],
  pages: 24,
  pdfPath: '/papers/community-responsibility-philosophy.pdf'
}

export default function CommunityResponsibilityPhilosophyPage() {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">
      {/* Interactive dots background */}
      <InteractiveDotsBackground />

      {/* Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-screen">
        <div className={`transition-all duration-1000 max-w-7xl mx-auto ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Breadcrumb Navigation */}
          <nav className="w-full mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-[#FAF3E0]/60">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                  onClick={playClick}
                >
                  miiyuh
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <Link 
                  href="/projects" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                  onClick={playClick}
                >
                  projects
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <Link 
                  href="/projects/papers" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                  onClick={playClick}
                >
                  papers
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <span className="text-[#FAF3E0]/90">community responsibility philosophy</span>
              </li>
            </ol>
          </nav>

          {/* Back button */}
          <div className="w-full mb-8">
            <Link
              href="/projects/papers"
              onClick={playClick}
              className="inline-flex items-center gap-2 text-sm text-[#FAF3E0]/70 hover:text-[#FAF3E0] transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              back to research papers
            </Link>
          </div>

          {/* Paper Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            
            {/* Left Column - Paper Information */}
            <div>
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-8 border border-[#FAF3E0]/10">
                
                {/* Paper Title */}
                <h1 className="text-3xl font-bold tracking-tight mb-4 text-[#FAF3E0] leading-tight">
                  {paperData.title}
                </h1>

                {/* Author and Year */}
                <div className="mb-6">
                  <p className="text-lg font-serif text-[#FAF3E0]/80 mb-1">
                    by <span className="font-semibold">{paperData.author}</span>
                  </p>
                  <p className="text-sm text-[#FAF3E0]/60 font-serif">
                    Published {paperData.year} • {paperData.pages} pages
                  </p>
                </div>

                {/* Abstract */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-[#FAF3E0]">Abstract</h2>
                  <p className="text-[#FAF3E0]/90 font-serif leading-relaxed text-justify">
                    {paperData.abstract}
                  </p>
                </div>

                {/* Keywords */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 text-[#FAF3E0]">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {paperData.keywords.map((keyword) => (
                      <span 
                        key={keyword}
                        className="px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-xs text-[#FAF3E0]/80 font-mono"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <div className="pt-6 border-t border-[#FAF3E0]/20">
                  <a
                    href={paperData.pdfPath}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF3E0]/10 hover:bg-[#FAF3E0]/20 rounded-lg transition-colors duration-300 text-[#FAF3E0] font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - PDF Viewer */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-2 border border-[#FAF3E0]/10">
                <iframe
                  src={paperData.pdfPath}
                  className="w-full h-[70vh] rounded-lg"
                  title={`${paperData.title} - PDF Viewer`}
                />
                
                {/* PDF Fallback */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-[#FAF3E0]/60 font-serif mb-2">
                    PDF not displaying? 
                  </p>
                  <a
                    href={paperData.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#FAF3E0]/80 hover:text-[#FAF3E0] underline transition-colors duration-300"
                  >
                    Open in new tab
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fun interactive element */}
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
          <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
            philosophy & meaning 📚
          </p>
        </div>
      </section>
    </main>
  )
}