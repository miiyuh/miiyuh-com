'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function TwoAlphaPage() {
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
      <section className="relative flex-grow px-6 md:px-12 lg:px-24 xl:px-32 py-12 min-h-[70vh]">

        {/* Breadcrumb Navigation - Top */}
        <nav className={`w-full mb-6 transition-all duration-1000 max-w-2xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} aria-label="Breadcrumb">
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
              <span className="text-[#FAF3E0]/90">2alpha</span>
            </li>
          </ol>
        </nav>
        
        {/* Back button */}
        <div className={`w-full mb-8 transition-all duration-1000 max-w-2xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '100ms' }}>
          <Link
            href="/projects"
            onClick={playClick}
            className="inline-flex items-center gap-2 text-sm text-[#FAF3E0]/70 hover:text-[#FAF3E0] transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            back to projects
          </Link>
        </div>
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start max-w-8xl">
            
            {/* Main Content - Left Side */}
            <div className={`lg:col-span-2 flex flex-col items-start text-left transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '200ms' }}>

          {/* Organization Logo/Image */}
          <div className="w-48 h-48 bg-[#FAF3E0]/10 rounded-lg flex items-center justify-center mb-8 group hover:bg-[#FAF3E0]/15 transition-all duration-300 overflow-hidden">
            <Image 
              src="/assets/img/projects/2alpha-logo.png"
              alt="2alpha logo"
              width={192}
              height={192}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Organization Info */}
          <h1 className="text-4xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
            2alpha
          </h1>
          
          <p className="font-serif text-lg text-[#FAF3E0]/90 hover:text-[#FAF3E0] transition-colors duration-300 mb-8">
            A specialized development division focused on cutting-edge technology research, prototype development, 
            and early-stage project incubation. 2alpha actively develops and contributes to open source solutions, 
            creating tools and utilities that are freely available to the developer community.
          </p>

          {/* Organization Info */}
          <div className="flex flex-wrap gap-4 mb-8 justify-start">
            <span className="px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-xs font-mono">
              Division: Development
            </span>
            <span className="px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-xs font-mono">
              Focus: Innovation & R&D
            </span>
            <span className="px-3 py-1 bg-[#FAF3E0]/10 rounded-full text-xs font-mono">
              Contributes: Open Source
            </span>
          </div>

          {/* Mission Statement */}
          <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-6 border border-[#FAF3E0]/10 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-[#FAF3E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-xl font-semibold text-[#FAF3E0]">Mission Statement</h2>
            </div>
            <p className="font-serif text-base text-[#FAF3E0]/90 leading-relaxed">
              To push the boundaries of what&apos;s possible in software development through experimental 
              technologies, open-source innovation, and collaborative research. We believe in creating 
              tools that empower developers and contribute to the global tech community.
            </p>
          </div>

          {/* Key Areas */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#FAF3E0] mb-6">Key Areas of Focus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-4 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-4 h-4 text-[#FAF3E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <h3 className="font-semibold text-[#FAF3E0]">Developer Tools</h3>
                </div>
                <p className="text-sm font-serif text-[#FAF3E0]/80">
                  Building utilities and frameworks that streamline development workflows and enhance productivity.
                </p>
              </div>
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-4 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-4 h-4 text-[#FAF3E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <h3 className="font-semibold text-[#FAF3E0]">Prototype Development</h3>
                </div>
                <p className="text-sm font-serif text-[#FAF3E0]/80">
                  Rapid prototyping of innovative concepts and proof-of-concept implementations.
                </p>
              </div>
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-4 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-4 h-4 text-[#FAF3E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="font-semibold text-[#FAF3E0]">Research & Experimentation</h3>
                </div>
                <p className="text-sm font-serif text-[#FAF3E0]/80">
                  Exploring emerging technologies and their practical applications in real-world scenarios.
                </p>
              </div>
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-4 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-4 h-4 text-[#FAF3E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="font-semibold text-[#FAF3E0]">Community Contributions</h3>
                </div>
                <p className="text-sm font-serif text-[#FAF3E0]/80">
                  Active participation in open-source projects and knowledge sharing with the developer community.
                </p>
              </div>
            </div>
          </div>

          {/* Technologies & Stack */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#FAF3E0] mb-4">Technologies & Stack</h2>
            <div className="flex flex-wrap gap-2">
              {[
                'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Go',
                'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'Redis',
                'AWS', 'Vercel', 'GitHub Actions', 'Tailwind CSS'
              ].map((tech) => (
                <span key={tech} className="px-2 py-1 bg-[#FAF3E0]/5 rounded text-xs font-mono text-[#FAF3E0]/70 hover:bg-[#FAF3E0]/10 transition-colors duration-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>

            </div>
            
            {/* Sidebar - Right Side */}
            <div className={`lg:col-span-1 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '300ms' }}>
              
              {/* Section Title */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#FAF3E0]">Open Source Projects</h3>
              </div>
              
              {/* Projects Preview - Single Card */}
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-6 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 mb-6 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#FAF3E0]/80" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <div>
                          <h4 className="font-semibold text-[#FAF3E0] group-hover:text-[#FAF3E0] transition-colors duration-300">
                            utilities.my
                          </h4>
                          <p className="text-xs text-[#FAF3E0]/60 font-mono">Open Source • Active Development</p>
                        </div>
                      </div>
                      <a
                        href="https://github.com/miiyuh/utilities.my"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#FAF3E0]/10 hover:bg-[#FAF3E0]/20 rounded-full text-xs font-mono transition-all duration-300 hover:scale-105"
                      >
                        View Source
                      </a>
                    </div>
                    <p className="text-sm font-serif text-[#FAF3E0]/80 mb-3">
                      A collection of useful utilities and tools designed to streamline development workflows and enhance productivity.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[#FAF3E0]/5 rounded text-xs font-mono text-[#FAF3E0]/70">
                        utilities
                      </span>
                      <span className="px-2 py-1 bg-[#FAF3E0]/5 rounded text-xs font-mono text-[#FAF3E0]/70">
                        tools
                      </span>
                      <span className="px-2 py-1 bg-[#FAF3E0]/5 rounded text-xs font-mono text-[#FAF3E0]/70">
                        open-source
                      </span>
                    </div>
              </div>
              
              {/* Recent Activity */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#FAF3E0]">Recent Activity</h3>
              </div>
              
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-6 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 mb-6 transition-all duration-300">
                <div className="space-y-4">
                  <div className="border-l-2 border-[#FAF3E0]/20 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <p className="text-xs text-[#FAF3E0]/60 font-mono">Dec 22, 2024</p>
                    </div>
                    <p className="text-sm text-[#FAF3E0]/90">Released utilities.my v1.2.0</p>
                    <p className="text-xs text-[#FAF3E0]/70 font-serif">Added new CLI tools and performance optimizations</p>
                  </div>
                  <div className="border-l-2 border-[#FAF3E0]/20 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <p className="text-xs text-[#FAF3E0]/60 font-mono">Dec 15, 2024</p>
                    </div>
                    <p className="text-sm text-[#FAF3E0]/90">Started new experimental project</p>
                    <p className="text-xs text-[#FAF3E0]/70 font-serif">Exploring AI-assisted development workflows</p>
                  </div>
                  <div className="border-l-2 border-[#FAF3E0]/20 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <p className="text-xs text-[#FAF3E0]/60 font-mono">Dec 08, 2024</p>
                    </div>
                    <p className="text-sm text-[#FAF3E0]/90">Contributed to community project</p>
                    <p className="text-xs text-[#FAF3E0]/70 font-serif">Submitted PR for performance improvements</p>
                  </div>
                  <div className="border-l-2 border-[#FAF3E0]/20 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <p className="text-xs text-[#FAF3E0]/60 font-mono">Dec 01, 2024</p>
                    </div>
                    <p className="text-sm text-[#FAF3E0]/90">Updated project documentation</p>
                    <p className="text-xs text-[#FAF3E0]/70 font-serif">Enhanced README and contribution guidelines</p>
                  </div>
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#FAF3E0]">Key Metrics</h3>
              </div>
              
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-6 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 mb-6 transition-all duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FAF3E0] mb-1">5+</div>
                    <div className="text-xs text-[#FAF3E0]/60 font-mono">Open Source Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FAF3E0] mb-1">12+</div>
                    <div className="text-xs text-[#FAF3E0]/60 font-mono">Contributors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FAF3E0] mb-1">2.5k+</div>
                    <div className="text-xs text-[#FAF3E0]/60 font-mono">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FAF3E0] mb-1">8</div>
                    <div className="text-xs text-[#FAF3E0]/60 font-mono">Languages</div>
                  </div>
                </div>
              </div>
              
              {/* Contact & Links */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#FAF3E0]">Connect</h3>
              </div>
              
              <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-lg p-6 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/20 transition-all duration-300">
                <div className="space-y-3">
                  <a
                    href="https://github.com/miiyuh"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="flex items-center gap-3 text-sm text-[#FAF3E0]/80 hover:text-[#FAF3E0] transition-colors duration-300 group"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub Organization</span>
                  </a>
                  <a
                    href="mailto:hello@miiyuh.com"
                    onClick={playClick}
                    className="flex items-center gap-3 text-sm text-[#FAF3E0]/80 hover:text-[#FAF3E0] transition-colors duration-300 group"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Get in Touch</span>
                  </a>
                  <div className="flex items-center gap-3 text-sm text-[#FAF3E0]/80">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>UTC+8 (Malaysia)</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

      </section>

    </main>
  )
}
