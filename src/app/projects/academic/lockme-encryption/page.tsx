'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function LockMeEncryptionPage() {
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
        <div className={`transition-all duration-1000 max-w-8xl mx-auto ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
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
                <span className="text-[#FAF3E0]/90">lockme encryption</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[80vh]">
            
            {/* Left Column - Project Information */}
            <div className="space-y-8">
              
              {/* Header */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#FAF3E0]/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔐</span>
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">
                      LockMe: Secure File Encryption Application
                    </h1>
                    <p className="text-[#FAF3E0]/60 font-serif text-base">Final Year Project (FYP) - Bachelor • Sep 2024 - June 2025</p>
                    <p className="text-[#FAF3E0]/50 font-serif text-sm">Management and Science University (MSU), Malaysia</p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="border border-[#FAF3E0]/10 transition-all duration-300 group p-8 bg-[#1A1A1A]">
                <h2 className="font-bold text-xl tracking-tight mb-5 text-[#FAF3E0]">Project Overview</h2>
                <p className="font-serif text-base text-[#FAF3E0]/90 leading-relaxed mb-6">
                  LockMe is a privacy-first desktop web application designed for secure file encryption and decryption. 
                  Built with Next.js and TypeScript, it runs entirely client-side using AES-256-GCM encryption via 
                  the Web Crypto API, ensuring your files and passphrases never touch a server. The application features 
                  an AI-powered security toolkit with Genkit + Gemini for passphrase generation and strength analysis, 
                  Firebase-powered user management, and a comprehensive code snippet manager. LockMe addresses the critical 
                  need for data security in the digital age while providing an intuitive, responsive interface that makes 
                  advanced cryptography accessible to end users. This project was developed as my Final Year Project (FYP) 
                  for my Bachelor in Computer Forensic (Hons.) at Management and Science University (MSU), Malaysia.
                </p>
              </div>

              {/* Technologies Used */}
              <div className="border border-[#FAF3E0]/10 transition-all duration-300 group p-8 bg-[#1A1A1A]">
                <h3 className="font-bold text-xl tracking-tight mb-5 text-[#FAF3E0]">Technologies & Tools</h3>
                <div className="flex flex-wrap gap-3">
                  {['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'ShadCN', 'Firebase Auth', 'Firestore', 'Firebase Storage', 'Genkit AI', 'Gemini API', 'Web Crypto API'].map((tech) => (
                    <span 
                      key={tech}
                      className="text-sm px-4 py-2 bg-[#FAF3E0]/10 rounded-full text-[#FAF3E0]/80 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cryptographic Implementation */}
              <div className="border border-[#FAF3E0]/10 transition-all duration-300 group p-8 bg-[#1A1A1A]">
                <h3 className="font-bold text-xl tracking-tight mb-5 text-[#FAF3E0]">Security Implementation</h3>
                <ul className="space-y-3 text-base font-serif text-[#FAF3E0]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>AES-256-GCM Encryption:</strong> Client-side encryption via Web Crypto API for maximum security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Client-Side Only:</strong> Files and passphrases never leave your device or touch any server</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Multiple File Support:</strong> Encrypt/decrypt multiple files simultaneously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Custom File Extension:</strong> Encrypted files use .lockme extension for identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>reCAPTCHA Security:</strong> Additional security layer for user interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Firebase Security Rules:</strong> Secure data handling with Firestore and Storage rules</span>
                  </li>
                </ul>
              </div>

              {/* Application Features & Capabilities */}
              <div className="border border-[#FAF3E0]/10 transition-all duration-300 group p-8 bg-[#1A1A1A]">
                <h3 className="font-bold text-xl tracking-tight mb-5 text-[#FAF3E0]">Key Features</h3>
                <ul className="space-y-3 text-base font-serif text-[#FAF3E0]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>AI Security Toolkit:</strong> Passphrase generator, recovery prompt enhancer, and strength analyzer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Code Snippet Manager:</strong> Store, tag, and encrypt code snippets with syntax highlighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>User Account Management:</strong> Email/password authentication with profile management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Personalized Dashboard:</strong> Track file activity, passphrase generation, and operation history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Responsive Design:</strong> Works seamlessly on desktop and mobile devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Theme Support:</strong> Light/dark mode toggle with localStorage preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Email Verification:</strong> Secure account management with password reset functionality</span>
                  </li>
                </ul>
              </div>

              {/* AI Integration & Research */}
              <div className="border border-[#FAF3E0]/10 transition-all duration-300 group p-8 bg-[#1A1A1A]">
                <h3 className="font-bold text-xl tracking-tight mb-5 text-[#FAF3E0]">AI Integration & Academic Research</h3>
                <ul className="space-y-3 text-base font-serif text-[#FAF3E0]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Genkit + Gemini AI:</strong> AI-powered passphrase generation and security analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Academic Foundation:</strong> Research based on Al-Hazaimeh (2013) and Mushtaq et al. (2017)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Supervised Research:</strong> Under Dr. Asma Mahfoudh Hezam Al-Hakimi at MSU</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Open Source:</strong> MIT License for community contributions and transparency</span>
                  </li>
                </ul>
              </div>

              {/* Project Methodology */}
              <div className="border border-[#FAF3E0]/10 transition-all duration-300 group p-8 bg-[#1A1A1A]">
                <h3 className="font-bold text-xl tracking-tight mb-5 text-[#FAF3E0]">Development Approach</h3>
                <ul className="space-y-3 text-base font-serif text-[#FAF3E0]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Privacy-First Design:</strong> Client-side encryption ensuring data never leaves the device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Modern Web Technologies:</strong> Next.js App Router with TypeScript for type safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>AI-Powered Security:</strong> Integration of Gemini API for intelligent security features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Firebase Integration:</strong> Secure user management with Firestore and Authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FAF3E0]/60">•</span>
                    <span><strong>Responsive Implementation:</strong> Cross-device compatibility with Tailwind CSS</span>
                  </li>
                </ul>
              </div>

              {/* Download Button */}
              <a
                href="/papers/lockme-encryption-system.pdf"
                download="lockme-encryption-system.pdf"
                onClick={playClick}
                className="border border-[#FAF3E0]/10 transition-all duration-300 group p-8 bg-[#1A1A1A] w-full rounded-lg font-serif text-[#FAF3E0] flex items-center justify-center gap-2 mb-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Project Documentation
              </a>

              {/* GitHub Repository Link */}
              <a
                href="https://github.com/miiyuh/lockme"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="border border-[#FAF3E0]/10 transition-all duration-300 group p-8 bg-[#1A1A1A] w-full rounded-lg font-serif text-[#FAF3E0] flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>

            {/* Right Column - PDF Viewer */}
            <div>
              <div className="border border-[#FAF3E0]/10 transition-all duration-300 group p-8 bg-[#1A1A1A] h-full min-h-[600px] lg:min-h-[80vh] flex flex-col">
                <div className="pb-4 mb-4 border-b border-[#FAF3E0]/10">
                  <h3 className="font-bold text-xl tracking-tight text-[#FAF3E0]">Project Documentation</h3>
                  <p className="text-sm text-[#FAF3E0]/60 font-serif">Security analysis and implementation details</p>
                </div>
                
                <div className="flex-1">
                  <div className="w-full h-full">
                    <object
                      data="/papers/lockme-encryption-system.pdf"
                      type="application/pdf"
                      className="w-full h-full rounded border border-[#FAF3E0]/20"
                      title="LockMe Encryption System Documentation"
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
                            <a
                              href="/papers/lockme-encryption-system.pdf"
                              download="lockme-encryption-system.pdf"
                              className="inline-block bg-[#FAF3E0]/10 border border-[#FAF3E0]/20 rounded-lg px-6 py-3 font-serif text-[#FAF3E0] transition-all duration-300"
                            >
                              Download Documentation
                            </a>
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
