'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSound } from '@/hooks/useSound'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'
import { ScrollAnimation } from '@/components/effects/scroll-animations'
import { SOCIAL_PLATFORMS } from '@/constants'
import { 
  MapPin, 
  Code2, 
  Camera, 
  GraduationCap, 
  Hammer, 
  Users, 
  Compass, 
  Sprout, 
  Heart, 
  Lightbulb,
  BookOpen,
  Globe,
  Telescope,
  Shield,
  Layers,
  Palette,
  Circle
} from 'lucide-react'

export default function AboutMePage() {
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

        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Breadcrumb Navigation */}
          <nav className="w-full mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-[#FAF3E0]/60">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-[#FAF3E0] transition-colors duration-300"
                >
                  miiyuh
                </Link>
              </li>
              <li>
                <span className="text-[#FAF3E0]/40">/</span>
              </li>
              <li>
                <span className="text-[#FAF3E0]/90">about me</span>
              </li>
            </ol>
          </nav>

          {/* Header Section */}
          <div className="mb-12 text-left">
            <h1 className="text-5xl font-bold tracking-tighter mb-4 hover:text-[#FAF3E0] transition-colors duration-300">
              about me
            </h1>
            <div className="w-24 h-0.5 bg-[#FAF3E0]/30"></div>
          </div>

          {/* Optimized Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
            
            {/* Profile Image - Tall */}
            <ScrollAnimation animation="fadeUp" delay={0.05} className="md:col-span-2 lg:col-span-3 lg:row-span-3">
              <div className="h-full min-h-[300px] md:min-h-[400px] p-6 bg-[#FAF3E0]/5 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300 flex items-center justify-center">
                <div className="w-full max-w-[280px] aspect-square relative overflow-hidden rounded-sm">
                  <Image
                    src="/assets/img/personal-profile-pic.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </div>
              </div>
            </ScrollAnimation>

            {/* Quick Intro - Wide */}
            <ScrollAnimation animation="fadeUp" delay={0.1} className="md:col-span-4 lg:col-span-6">
              <div className="h-full p-6 bg-[#FAF3E0]/5 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300">
                <h2 className="text-xl font-bold mb-3">Hi, I'm Azri</h2>
                <p className="text-sm text-[#FAF3E0]/80 font-serif leading-relaxed">
                  Computer forensics student at MSU Malaysia. I build things with code, capture moments through photography, and believe in tech that serves people—not the other way around.
                </p>
              </div>
            </ScrollAnimation>

            {/* Location */}
            <ScrollAnimation animation="fadeUp" delay={0.15} className="md:col-span-2 lg:col-span-3">
              <div className="h-full p-6 bg-[#FAF3E0]/5 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300 flex flex-col justify-between">
                <MapPin className="w-6 h-6 mb-3 text-[#FAF3E0]/60" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Based in</h3>
                  <p className="text-sm text-[#FAF3E0]/70">Malaysia</p>
                </div>
              </div>
            </ScrollAnimation>

            {/* Current Status */}
            <ScrollAnimation animation="fadeUp" delay={0.2} className="md:col-span-2 lg:col-span-3">
              <div className="h-full p-6 bg-[#FAF3E0]/5 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <Circle className="w-3 h-3 fill-green-500 text-green-500 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FAF3E0]/60">Available</span>
                </div>
                <p className="text-sm text-[#FAF3E0]/70 leading-relaxed">
                  Open for collaborations
                </p>
              </div>
            </ScrollAnimation>

            {/* What I Do - Large Feature */}
            <ScrollAnimation animation="fadeUp" delay={0.25} className="md:col-span-4 lg:col-span-6 lg:row-span-2">
              <div className="h-full p-6 bg-[#FAF3E0]/5 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300">
                <h2 className="text-xl font-bold mb-5">What I Do</h2>
                <div className="space-y-5">
                  <div className="flex gap-4 group">
                    <GraduationCap className="w-5 h-5 flex-shrink-0 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold mb-1.5 text-sm">Learning & Growing</h3>
                      <p className="text-sm text-[#FAF3E0]/70 font-serif leading-relaxed">
                        Studying computer forensics, cybersecurity, and digital investigation at MSU Malaysia
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 group">
                    <Code2 className="w-5 h-5 flex-shrink-0 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold mb-1.5 text-sm">Building with Purpose</h3>
                      <p className="text-sm text-[#FAF3E0]/70 font-serif leading-relaxed">
                        Creating web experiences with Next.js, contributing to open-source, using AI ethically
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 group">
                    <Camera className="w-5 h-5 flex-shrink-0 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold mb-1.5 text-sm">Capturing Moments</h3>
                      <p className="text-sm text-[#FAF3E0]/70 font-serif leading-relaxed">
                        Photography focusing on landscapes, architecture, and urban scenes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Tech Stack */}
            <ScrollAnimation animation="fadeUp" delay={0.3} className="md:col-span-3 lg:col-span-3">
              <div className="h-full p-6 bg-[#FAF3E0]/5 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-5 h-5 text-[#FAF3E0]/60" strokeWidth={1.5} />
                  <h3 className="font-semibold text-sm">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'TypeScript', 'React', 'Python', 'Tailwind', 'Node.js'].map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs px-2.5 py-1 bg-[#FAF3E0]/10 border border-[#FAF3E0]/20 hover:bg-[#FAF3E0]/15 hover:border-[#FAF3E0]/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            {/* Interests */}
            <ScrollAnimation animation="fadeUp" delay={0.35} className="md:col-span-3 lg:col-span-3">
              <div className="h-full p-6 bg-[#FAF3E0]/5 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Telescope className="w-5 h-5 text-[#FAF3E0]/60" strokeWidth={1.5} />
                  <h3 className="font-semibold text-sm">Interests</h3>
                </div>
                <div className="space-y-2.5">
                  {[
                    { icon: Shield, label: 'Digital Forensics' },
                    { icon: Shield, label: 'Cybersecurity' },
                    { icon: Code2, label: 'Web Development' },
                    { icon: Camera, label: 'Photography' }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm text-[#FAF3E0]/70 group">
                      <item.icon className="w-3.5 h-3.5 text-[#FAF3E0]/40 group-hover:text-[#FAF3E0]/70 transition-colors" strokeWidth={1.5} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            {/* Philosophy & Values - Wide Feature */}
            <ScrollAnimation animation="fadeUp" delay={0.4} className="md:col-span-6 lg:col-span-9">
              <div className="h-full p-6 bg-[#FAF3E0]/5 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300">
                <h2 className="text-xl font-bold mb-5">Philosophy & Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex gap-3 group">
                    <Compass className="w-5 h-5 flex-shrink-0 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold text-sm mb-1.5">Ethics First</h3>
                      <p className="text-sm text-[#FAF3E0]/70 font-serif leading-relaxed">
                        Technology with transparency, accountability, and human oversight
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 group">
                    <Sprout className="w-5 h-5 flex-shrink-0 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold text-sm mb-1.5">Continuous Growth</h3>
                      <p className="text-sm text-[#FAF3E0]/70 font-serif leading-relaxed">
                        Learning from failures, progress over perfection
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 group">
                    <Users className="w-5 h-5 flex-shrink-0 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold text-sm mb-1.5">Community First</h3>
                      <p className="text-sm text-[#FAF3E0]/70 font-serif leading-relaxed">
                        Better public transport, people-first policies for Malaysia
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 group">
                    <Lightbulb className="w-5 h-5 flex-shrink-0 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-semibold text-sm mb-1.5">Meaning & Purpose</h3>
                      <p className="text-sm text-[#FAF3E0]/70 font-serif leading-relaxed">
                        Living with intention, making hard choices, moving forward
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Currently Working On */}
            <ScrollAnimation animation="fadeUp" delay={0.45} className="md:col-span-3 lg:col-span-3 lg:row-span-2">
              <div className="h-full p-6 bg-[#FAF3E0]/5 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300">
                <h3 className="font-semibold text-sm mb-5">Currently</h3>
                <div className="space-y-4">
                  <div className="group">
                    <BookOpen className="w-5 h-5 mb-2 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors" strokeWidth={1.5} />
                    <p className="text-sm text-[#FAF3E0]/70 leading-relaxed">Studying forensics & cybersecurity</p>
                  </div>
                  <div className="group">
                    <Hammer className="w-5 h-5 mb-2 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors" strokeWidth={1.5} />
                    <p className="text-sm text-[#FAF3E0]/70 leading-relaxed">Building this portfolio with Next.js</p>
                  </div>
                  <div className="group">
                    <Camera className="w-5 h-5 mb-2 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors" strokeWidth={1.5} />
                    <p className="text-sm text-[#FAF3E0]/70 leading-relaxed">Capturing Malaysia's landscapes</p>
                  </div>
                  <div className="group">
                    <Globe className="w-5 h-5 mb-2 text-[#FAF3E0]/60 group-hover:text-[#FAF3E0] transition-colors" strokeWidth={1.5} />
                    <p className="text-sm text-[#FAF3E0]/70 leading-relaxed">Advocating for better Malaysia</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Timeline/Journey */}
            <ScrollAnimation animation="fadeUp" delay={0.5} className="md:col-span-3 lg:col-span-6">
              <div className="h-full p-6 bg-[#FAF3E0]/5 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300">
                <h2 className="text-xl font-bold mb-5">Journey</h2>
                <div className="space-y-3.5">
                  <div className="flex gap-4 group">
                    <span className="text-[#FAF3E0]/40 font-bold font-mono text-sm flex-shrink-0 w-14 group-hover:text-[#FAF3E0] transition-colors">2025</span>
                    <p className="text-sm text-[#FAF3E0]/70">Building portfolio, learning PayloadCMS & AI ethics</p>
                  </div>
                  <div className="flex gap-4 group">
                    <span className="text-[#FAF3E0]/40 font-bold font-mono text-sm flex-shrink-0 w-14 group-hover:text-[#FAF3E0] transition-colors">2024</span>
                    <p className="text-sm text-[#FAF3E0]/70">Started computer forensics at MSU Malaysia</p>
                  </div>
                  <div className="flex gap-4 group">
                    <span className="text-[#FAF3E0]/40 font-bold font-mono text-sm flex-shrink-0 w-14 group-hover:text-[#FAF3E0] transition-colors">2023</span>
                    <p className="text-sm text-[#FAF3E0]/70">Open-source contributions & web development</p>
                  </div>
                  <div className="flex gap-4 group">
                    <span className="text-[#FAF3E0]/40 font-bold font-mono text-sm flex-shrink-0 w-14 group-hover:text-[#FAF3E0] transition-colors">2022</span>
                    <p className="text-sm text-[#FAF3E0]/70">Discovered photography & digital art</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Creative Work */}
            <ScrollAnimation animation="fadeUp" delay={0.55} className="md:col-span-3 lg:col-span-3">
              <div className="h-full p-6 bg-[#FAF3E0]/5 border border-[#FAF3E0]/10 hover:border-[#FAF3E0]/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-5 h-5 text-[#FAF3E0]/60" strokeWidth={1.5} />
                  <h3 className="font-semibold text-sm">Creative</h3>
                </div>
                <div className="space-y-2.5">
                  {['Photography', 'Digital Art', 'UI/UX Design', 'Motion Graphics'].map((item) => (
                    <div key={item} className="text-sm text-[#FAF3E0]/70 flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#FAF3E0]/40 rounded-full"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </main>
  )
}
