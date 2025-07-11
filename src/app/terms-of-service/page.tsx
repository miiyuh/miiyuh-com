'use client'

import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'
import { HeadingWithHash } from '@/components/ui/heading-with-hash'

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const sections = ['overview', 'acceptance-of-terms', 'use-of-site', 'user-accounts', 'intellectual-property', 'user-content', 'prohibited-activities', 'privacy-policy', 'disclaimers', 'limitation-of-liability', 'indemnification', 'termination', 'governing-law', 'changes-to-terms', 'contact-information']
      const headerHeight = 96
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= headerHeight + 20 && rect.bottom >= headerHeight + 20) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 96 // Adjusted for better alignment
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const tableOfContents = [
    { id: 'overview', title: 'Overview' },
    { id: 'acceptance-of-terms', title: 'Acceptance of Terms' },
    { id: 'use-of-site', title: 'Use of the Site' },
    { id: 'user-accounts', title: 'User Accounts' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'user-content', title: 'User Content' },
    { id: 'prohibited-activities', title: 'Prohibited Activities' },
    { id: 'privacy-policy', title: 'Privacy Policy' },
    { id: 'disclaimers', title: 'Disclaimers' },
    { id: 'limitation-of-liability', title: 'Limitation of Liability' },
    { id: 'indemnification', title: 'Indemnification' },
    { id: 'termination', title: 'Termination' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'changes-to-terms', title: 'Changes to Terms' },
    { id: 'contact-information', title: 'Contact Information' }
  ]
  return (
    <>
      <Head>
        <title>terms of service | miiyuh</title>
        <meta name="description" content="terms of service for miiyuh.com" />
      </Head>

      <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">
        {/* Interactive dots background */}
        <InteractiveDotsBackground />
        
        <div className="relative flex-grow flex px-6 py-12 min-h-screen max-w-7xl mx-auto gap-8">
          {/* Table of Contents - Left Sidebar */}
          <aside className={`hidden lg:block w-64 flex-shrink-0 transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="sticky top-24">
              <nav className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-xl p-6 border border-[#FAF3E0]/20">
                <h3 className="text-lg font-bold mb-4 text-[#FAF3E0]">Contents</h3>
                <ul className="space-y-2">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-300 hover:bg-[#FAF3E0]/10 ${
                          activeSection === item.id 
                            ? 'bg-[#FAF3E0]/15 text-[#FAF3E0] font-semibold border-l-2 border-[#FAF3E0]/50' 
                            : 'text-[#FAF3E0]/70 hover:text-[#FAF3E0]'
                        }`}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <section className={`flex-1 max-w-4xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
                  <span className="text-[#FAF3E0]/90">terms of service</span>
                </li>
              </ol>
            </nav>

            <div className="prose prose-invert max-w-none">
              <h1 className="text-4xl font-bold tracking-tight font-sans mb-6 text-[#FAF3E0]">terms of service</h1>
              <p className="text-sm text-[#FAF3E0]/60 mb-8">Last updated: June 2025</p>

              <section id="overview" className="mb-12 scroll-mt-24">
                <HeadingWithHash 
                  id="overview" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Overview
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Welcome to miiyuh.com. These Terms of Service (&quot;Terms&quot;) govern your use of our digital portfolio website and all associated services, including our photo galleries, project showcases, academic work displays, research paper viewing, social media integrations, and interactive features.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Our website is operated from Malaysia, by a Malaysian, and is subject to Malaysian law. The site serves as a comprehensive portfolio featuring personal and academic projects, research documentation, and creative work. By accessing or using miiyuh.com, you agree to be bound by these Terms and our Privacy Policy.
                </p>
              </section>

              <section id="acceptance-of-terms" className="mb-12 scroll-mt-24">
                <HeadingWithHash 
                  id="acceptance-of-terms" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Acceptance of Terms
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using this website&apos;s particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  If you do not agree to abide by the above, please do not use this service. We reserve the right to change these terms and conditions without notice.
                </p>
              </section>

              <section id="use-of-site" className="mb-12 scroll-mt-24">
                <HeadingWithHash 
                  id="use-of-site" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Use of the Site
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  You may use our website for lawful purposes only. You agree to use the website in a manner consistent with all applicable laws and regulations, including the laws of Malaysia where our website is operated and hosted.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  You are responsible for ensuring that your use of the website complies with all applicable laws in your jurisdiction and Malaysian law, as our services are provided from Malaysia.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3 text-[#FAF3E0]">Permitted Uses</h3>
                <ul className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90 list-disc list-inside space-y-2">
                  <li>Browsing and viewing portfolio content, including galleries and project showcases</li>
                  <li>Viewing and downloading publicly available research papers and project documentation</li>
                  <li>Using social media redirect links and miiyuh.com/ short URLs</li>
                  <li>Interacting with gallery features, project filters, and navigation elements</li>
                  <li>Sharing content through social media platforms and external links</li>
                  <li>Contacting us through provided communication channels</li>
                  <li>Accessing academic work and university project information for educational purposes</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-[#FAF3E0]">Restrictions</h3>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  You agree not to engage in any activity that may harm, disrupt, or interfere with the site&apos;s operation, including but not limited to unauthorized access attempts, data mining, or malicious code distribution.
                </p>
              </section>

              <section id="user-accounts" className="mb-12">
                <HeadingWithHash 
                  id="user-accounts" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  User Accounts
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Currently, miiyuh.com does not require user registration or account creation for basic website access. Should we implement user accounts in the future, additional terms will apply.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  If you choose to contact us or subscribe to any services, you are responsible for maintaining the confidentiality of any login information and for all activities that occur under your account.
                </p>
              </section>

              <section id="intellectual-property" className="mb-12 scroll-mt-24">
                <HeadingWithHash 
                  id="intellectual-property" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Intellectual Property Rights
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  All content on this website, including but not limited to photography, artwork, project documentation, research papers, academic work, code examples, design elements, interactive features, and multimedia content, is the property of miiyuh or its content suppliers and is protected by Malaysian and international copyright laws.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3 text-[#FAF3E0]">Portfolio Content Ownership</h3>
                <ul className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90 list-disc list-inside space-y-2">
                  <li>Original photography collections (2025 Japan trip, artwork galleries) belong to miiyuh</li>
                  <li>Academic project work (Library Management System, LockMe) is original work by Muhamad Azri a.k.a. miiyuh</li>
                  <li>Research papers and documentation are academic work produced at MSU, Malaysia</li>
                  <li>Personal project showcases (studio shingeki, 2alpha, miyabi) are proprietary creative work</li>
                  <li>Website design, interactive elements, and user interface are proprietary to miiyuh</li>
                  <li>Source code for showcased projects may be available under separate licenses via GitHub</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-[#FAF3E0]">Usage Rights and Restrictions</h3>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  You may view and download publicly available research papers and project documentation for educational and personal use. However, you may not reproduce, distribute, modify, create derivative works of, or commercially use any portfolio content, photography, artwork, or proprietary project work without prior written consent.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3 text-[#FAF3E0]">Academic Work Usage</h3>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Academic projects and research papers are provided for educational reference. Proper citation and attribution are required if referencing this work in academic or professional contexts, following standard academic citation practices.
                </p>
              </section>

              <section id="user-content" className="mb-12">
                <HeadingWithHash 
                  id="user-content" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  User-Generated Content
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  If you submit any content to our website (such as comments, feedback, or messages), you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute such content.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  You represent and warrant that you own or have the necessary rights to any content you submit and that such content does not infringe upon the rights of any third party.
                </p>
              </section>

              <section id="prohibited-activities" className="mb-12">
                <HeadingWithHash 
                  id="prohibited-activities" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Prohibited Activities
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  You may not use our website for any unlawful purpose or to solicit others to perform unlawful acts. The following activities are specifically prohibited and may violate Malaysian law or international law:
                </p>
                <ul className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90 list-disc list-inside space-y-2">
                  <li>Attempting to gain unauthorized access to any portion of the website</li>
                  <li>Using automated systems to access the website without permission</li>
                  <li>Introducing viruses, trojans, or other malicious code</li>
                  <li>Copying, reproducing, or distributing content without permission</li>
                  <li>Harassing, abusing, or harming other users</li>
                  <li>Impersonating any person or entity</li>
                  <li>Violating any applicable local, state, national, or international law, including Malaysian law</li>
                </ul>
              </section>

              <section id="privacy-policy" className="mb-12">
                <HeadingWithHash 
                  id="privacy-policy" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Privacy Policy
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our website. By using our website, you agree to the collection and use of information in accordance with our Privacy Policy.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  We operate in compliance with the Personal Data Protection Act 2010 (PDPA) of Malaysia and other applicable data protection laws. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.
                </p>
              </section>

              <section id="disclaimers" className="mb-12">
                <HeadingWithHash 
                  id="disclaimers" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Disclaimers
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, this website excludes all representations, warranties, and conditions relating to our website and its use.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3 text-[#FAF3E0]">No Warranty</h3>
                <ul className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90 list-disc list-inside space-y-2">
                  <li>We do not warrant that the website will be available at all times</li>
                  <li>We do not guarantee the accuracy or completeness of information</li>
                  <li>We are not responsible for any technical issues or interruptions</li>
                  <li>Third-party links are provided for convenience only</li>
                </ul>
              </section>

              <section id="limitation-of-liability" className="mb-12">
                <HeadingWithHash 
                  id="limitation-of-liability" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Limitation of Liability
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  In no event shall miiyuh, its officers, directors, employees, or agents be liable to you for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any use of this website.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  This limitation applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, even if miiyuh has been advised of the possibility of such damage.
                </p>
              </section>

              <section id="indemnification" className="mb-12">
                <HeadingWithHash 
                  id="indemnification" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Indemnification
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  You agree to indemnify, defend, and hold harmless miiyuh and its affiliates, officers, agents, employees, and partners from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney&apos;s fees).
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  This indemnification applies to claims arising from your use of the website, your violation of these Terms, or your violation of any rights of another party.
                </p>
              </section>

              <section id="termination" className="mb-12">
                <HeadingWithHash 
                  id="termination" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Termination
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  We reserve the right to terminate or suspend your access to our website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Upon termination, your right to use the website will cease immediately. All provisions of the Terms which by their nature should survive termination shall survive termination.
                </p>
              </section>

              <section id="governing-law" className="mb-12">
                <HeadingWithHash 
                  id="governing-law" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Governing Law
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  These Terms shall be interpreted and governed by the laws of Malaysia, without regard to its conflict of law provisions. Our website is operated from Malaysia and all services are provided in accordance with Malaysian law.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Malaysia. By using our website, you consent to the jurisdiction of Malaysian courts for any legal proceedings.
                </p>
              </section>

              <section id="changes-to-terms" className="mb-12">
                <HeadingWithHash 
                  id="changes-to-terms" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Changes to Terms
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  What constitutes a material change will be determined at our sole discretion. By continuing to access or use our website after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              <section id="contact-information" className="mb-12">
                <HeadingWithHash 
                  id="contact-information" 
                  level="h2" 
                  className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]"
                >
                  Contact Information
                </HeadingWithHash>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-xl p-6 border border-[#FAF3E0]/20">
                  <p className="font-serif text-lg leading-relaxed mb-2 text-[#FAF3E0]/90">
                    <strong>Email:</strong> legal@miiyuh.com
                  </p>
                  <p className="font-serif text-lg leading-relaxed text-[#FAF3E0]/90">
                    We will respond to your inquiry within a reasonable timeframe, typically within 30 days.
                  </p>
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
