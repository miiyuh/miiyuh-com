'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function LibraryManagementPage() {
  const [mounted, setMounted] = useState(false)
  const playClick = useSound('/sounds/click.mp3', 0.7)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDownload = () => {
    playClick()
    // In a real implementation, this would download the actual project documentation
    alert('Download functionality would be implemented here with actual project files')
  }

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
                  href="/projects/academic" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                  onClick={playClick}
                >
                  academic
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <span className="text-[#FAF3E0]/90">library management</span>
              </li>
            </ol>
          </nav>

          {/* Back button */}
          <div className="w-full mb-8">
            <Link
              href="/projects/academic"
              onClick={playClick}
              className="inline-flex items-center gap-2 text-sm text-[#FAF3E0]/70 hover:text-[#FAF3E0] transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              back to academic projects
            </Link>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-[80vh]">
            
            {/* Left Column - Project Information */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Header */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#FAF3E0]/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📚</span>
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tighter">
                      Library Management System
                    </h1>
                    <p className="text-[#FAF3E0]/60 font-serif text-sm">Final Year Project (FYP) - Diploma • September 2023</p>
                    <p className="text-[#FAF3E0]/50 font-serif text-xs">Management and Science University (MSU), Malaysia</p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-6 border border-[#FAF3E0]/10">
                <h2 className="font-bold text-lg mb-4 text-[#FAF3E0]">Project Overview</h2>
                <p className="font-serif text-[#FAF3E0]/90 leading-relaxed mb-4">
                  A comprehensive library management system designed to streamline library operations. 
                  The system features book cataloging, member management, loan tracking, and automated 
                  fine calculations. Built with Java and MySQL, it provides a robust desktop application 
                  with an intuitive GUI for librarians and staff. This project was developed as the 
                  capstone Final Year Project for my Diploma in Computer Forensic at Management and 
                  Science University (MSU), Malaysia.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#FAF3E0]/60 font-serif">Project Type:</span>
                    <p className="font-mono text-[#FAF3E0]">Final Year Project (FYP)</p>
                  </div>
                  <div>
                    <span className="text-[#FAF3E0]/60 font-serif">Completed:</span>
                    <p className="font-mono text-[#FAF3E0]">September 2023</p>
                  </div>
                  <div>
                    <span className="text-[#FAF3E0]/60 font-serif">Program:</span>
                    <p className="font-mono text-[#FAF3E0]">Diploma in Computer Forensic</p>
                  </div>
                  <div>
                    <span className="text-[#FAF3E0]/60 font-serif">University:</span>
                    <p className="font-mono text-[#FAF3E0]">MSU, Malaysia</p>
                  </div>
                  <div>
                    <span className="text-[#FAF3E0]/60 font-serif">Grade:</span>
                    <p className="font-mono text-[#FAF3E0]">A+</p>
                  </div>
                  <div>
                    <span className="text-[#FAF3E0]/60 font-serif">Status:</span>
                    <p className="font-mono text-green-300">Completed</p>
                  </div>
                </div>
              </div>

              {/* Technologies Used */}
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-6 border border-[#FAF3E0]/10">
                <h3 className="font-bold text-lg mb-4 text-[#FAF3E0]">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'MySQL', 'JDBC', 'Swing GUI', 'Database Design', 'SQL'].map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-[#FAF3E0]/80 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-6 border border-[#FAF3E0]/10">
                <h3 className="font-bold text-lg mb-4 text-[#FAF3E0]">Key Features</h3>
                <ul className="space-y-2 text-sm font-serif text-[#FAF3E0]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span>Book cataloging with ISBN, author, and category management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span>Member registration and profile management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span>Book loan and return tracking system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span>Automated fine calculation for overdue books</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span>Search and filter functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span>Report generation for library statistics</span>
                  </li>
                </ul>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="w-full bg-[#FAF3E0]/10 hover:bg-[#FAF3E0]/20 border border-[#FAF3E0]/20 hover:border-[#FAF3E0]/40 rounded-lg px-6 py-3 font-serif text-[#FAF3E0] transition-all duration-300 flex items-center justify-center gap-2 mb-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Project Documentation
              </button>

              {/* GitHub Repository Link */}
              <a
                href="https://github.com/miiyuh/202309-fyp"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#FAF3E0]/20 hover:border-[#FAF3E0]/40 rounded-lg px-6 py-3 font-serif text-[#FAF3E0] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>

            {/* Right Column - PDF Viewer */}
            <div className="lg:col-span-3">
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg border border-[#FAF3E0]/10 h-full min-h-[600px] lg:min-h-[80vh] flex flex-col">
                <div className="p-4 border-b border-[#FAF3E0]/10">
                  <h3 className="font-bold text-[#FAF3E0]">Project Documentation</h3>
                  <p className="text-xs text-[#FAF3E0]/60 font-serif">System architecture and implementation details</p>
                </div>
                
                <div className="flex-1 p-4">
                  <div className="w-full h-full">
                    <object
                      data="/papers/library-management-system.pdf"
                      type="application/pdf"
                      className="w-full h-full rounded border border-[#FAF3E0]/20"
                      title="Library Management System Documentation"
                    >
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-[#FAF3E0]/10 rounded-lg flex items-center justify-center mx-auto">
                            <span className="text-2xl">📄</span>
                          </div>
                          <div>
                            <p className="font-serif text-[#FAF3E0]/80 mb-2">
                              PDF document not available
                            </p>
                            <p className="text-sm text-[#FAF3E0]/60 font-serif mb-4">
                              The project documentation PDF is not yet uploaded to this location.
                            </p>
                            <button
                              onClick={handleDownload}
                              className="bg-[#FAF3E0]/10 hover:bg-[#FAF3E0]/20 border border-[#FAF3E0]/20 hover:border-[#FAF3E0]/40 rounded px-4 py-2 text-sm font-serif text-[#FAF3E0] transition-all duration-300"
                            >
                              Download Documentation
                            </button>
                          </div>
                        </div>
                      </div>
                    </object>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
