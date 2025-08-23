'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

const paperData = {
  title: 'Sustainable Technology: Reducing the Environmental Impact of Software Development',
  author: 'miiyuh',
  year: '2023',
  abstract: 'This paper investigates the environmental impact of software development practices and proposes strategies for creating more sustainable technology solutions. It covers energy-efficient coding practices, sustainable hosting solutions, and the lifecycle impact of digital products. The research explores how developers can minimize their carbon footprint through conscious decision-making in technology choices, optimization techniques, and sustainable deployment practices. Case studies demonstrate practical applications of green computing principles in real-world software projects.',
  keywords: ['Sustainable Technology', 'Green Computing', 'Environmental Impact', 'Software Development', 'Carbon Footprint'],
  pages: 21,
  pdfPath: '/papers/sustainable-technology-development.pdf'
}

export default function SustainableTechPaperPage() {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative min-h-screen">
      {/* Interactive dots background */}
      <InteractiveDotsBackground />

      {/* Page Content */}
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12">
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
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
                <span className="text-[#FAF3E0]/90">sustainable tech</span>
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
            <div className="lg:sticky lg:top-24 lg:self-start">
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
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg border border-[#FAF3E0]/10 overflow-hidden">
                <div className="p-4 border-b border-[#FAF3E0]/20">
                  <h3 className="text-lg font-semibold text-[#FAF3E0]">Paper Preview</h3>
                </div>
                
                {/* PDF Viewer Container */}
                <div className="relative bg-white rounded-b-lg" style={{ height: '80vh' }}>
                  {/* PDF Embed */}
                  <iframe
                    src={`${paperData.pdfPath}#toolbar=1&navpanes=1&scrollbar=1`}
                    className="w-full h-full rounded-b-lg"
                    title={`${paperData.title} PDF`}
                  />
                  
                  {/* Fallback message if PDF doesn't load */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-600 rounded-b-lg">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-medium">PDF Viewer</p>
                      <p className="text-sm text-gray-500 mt-2">
                        If the PDF doesn&apos;t display, please download it using the button on the left.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fun interactive element */}
        <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 xl:right-32">
          <p className="font-serif text-xs text-[#FAF3E0]/40 hover:text-[#FAF3E0]/70 transition-colors duration-300 cursor-default">
            coding for the planet 🌱
          </p>
        </div>
      </section>
    </main>
  )
}
