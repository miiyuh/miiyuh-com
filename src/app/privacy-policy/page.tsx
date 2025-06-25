'use client'

import Head from 'next/head'
import { useState, useEffect } from 'react'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const sections = ['overview', 'information-we-collect', 'how-we-use-information', 'information-sharing', 'data-security', 'cookies', 'your-rights', 'third-party-services', 'children-privacy', 'international-users', 'changes-to-policy', 'contact-us']
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
    { id: 'information-we-collect', title: 'Information We Collect' },
    { id: 'how-we-use-information', title: 'How We Use Your Information' },
    { id: 'information-sharing', title: 'Information Sharing' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'cookies', title: 'Cookies and Tracking' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'third-party-services', title: 'Third-Party Services' },
    { id: 'children-privacy', title: 'Children\'s Privacy' },
    { id: 'international-users', title: 'International Users' },
    { id: 'changes-to-policy', title: 'Changes to This Policy' },
    { id: 'contact-us', title: 'Contact Us' }
  ]
  return (
    <>
      <Head>
        <title>privacy policy | miiyuh</title>
        <meta name="description" content="privacy policy for miiyuh.com" />
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
            <div className="prose prose-invert max-w-none">
              <h1 className="text-4xl font-bold tracking-tight font-sans mb-6 text-[#FAF3E0]">privacy policy</h1>
              <p className="text-sm text-[#FAF3E0]/60 mb-8">Last updated: January 2025</p>

              <section id="overview" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">Overview</h2>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Welcome to miiyuh.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. We are committed to protecting your privacy and ensuring you have a positive experience on our website.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  This policy applies to all information collected or submitted on miiyuh.com. By accessing or using our service, you agree to this Privacy Policy. If you disagree with the terms of this Privacy Policy, please do not access the site.
                </p>
              </section>

              <section id="information-we-collect" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mt-6 mb-3 text-[#FAF3E0]">Automatically Collected Information</h3>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  When you visit our website, we may automatically collect certain information about your device and usage patterns, including:
                </p>
                <ul className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90 list-disc list-inside space-y-2">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Operating system information</li>
                  <li>Device identifiers and characteristics</li>
                  <li>Referring website addresses</li>
                  <li>Pages visited and time spent on each page</li>
                  <li>Date and time of visits</li>
                  <li>Search terms used to find our site</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-[#FAF3E0]">Information You Provide</h3>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  We may collect information that you voluntarily provide to us when you contact us or interact with our services, such as your name, email address, and any messages or feedback you send.
                </p>
              </section>

              <section id="how-we-use-information" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">How We Use Your Information</h2>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90 list-disc list-inside space-y-2">
                  <li>Providing, maintaining, and improving our website</li>
                  <li>Understanding how visitors use our site</li>
                  <li>Analyzing trends and user behavior</li>
                  <li>Preventing fraud and ensuring security</li>
                  <li>Responding to your inquiries and providing support</li>
                  <li>Complying with legal obligations</li>
                  <li>Protecting our rights and the rights of others</li>
                </ul>
              </section>

              <section id="information-sharing" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">Information Sharing</h2>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information in the following circumstances:
                </p>
                <ul className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90 list-disc list-inside space-y-2">
                  <li>With service providers who assist us in operating our website</li>
                  <li>When required by law or to comply with legal processes</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section id="data-security" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">Data Security</h2>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. We regularly review and update our security practices to ensure the ongoing protection of your data.
                </p>
              </section>

              <section id="cookies" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">Cookies and Tracking Technologies</h2>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  We may use cookies, web beacons, and other tracking technologies to collect information about your browsing activities. These technologies help us:
                </p>
                <ul className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90 list-disc list-inside space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze site traffic and usage patterns</li>
                  <li>Improve user experience and site functionality</li>
                  <li>Provide personalized content</li>
                </ul>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
                </p>
              </section>

              <section id="your-rights" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">Your Rights</h2>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90 list-disc list-inside space-y-2">
                  <li>The right to access your personal information</li>
                  <li>The right to rectify inaccurate information</li>
                  <li>The right to erase your personal information</li>
                  <li>The right to restrict processing</li>
                  <li>The right to data portability</li>
                  <li>The right to object to processing</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section.
                </p>
              </section>

              <section id="third-party-services" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">Third-Party Services</h2>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party services you access through our website.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  We may also use third-party analytics services to help understand how our website is used. These services may collect information sent by your browser as part of a web page request.
                </p>
              </section>

              <section id="children-privacy" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">Children&apos;s Privacy</h2>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section id="international-users" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">International Users</h2>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  Our website is operated from Malaysia. If you are accessing our website from outside Malaysia, please be aware that your information may be transferred to, stored, and processed in Malaysia where our servers are located and our central database is operated.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  By using our website, you consent to the transfer of your information to Malaysia and acknowledge that the data protection laws in Malaysia may differ from those in your country of residence. We comply with the Personal Data Protection Act 2010 (PDPA) of Malaysia.
                </p>
              </section>

              <section id="changes-to-policy" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">Changes to This Policy</h2>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the &quot;Last updated&quot; date at the top of this policy.
                </p>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information. Your continued use of our website after any changes constitutes your acceptance of the updated policy.
                </p>
              </section>

              <section id="contact-us" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-4 text-[#FAF3E0]">Contact Us</h2>
                <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]/90">
                  If you have any questions about this Privacy Policy, your rights, or our data practices, please contact us:
                </p>
                <div className="bg-[#FAF3E0]/5 backdrop-blur-sm rounded-xl p-6 border border-[#FAF3E0]/20">
                  <p className="font-serif text-lg leading-relaxed mb-2 text-[#FAF3E0]/90">
                    <strong>Email:</strong> privacy@miiyuh.com
                  </p>
                  <p className="font-serif text-lg leading-relaxed mb-2 text-[#FAF3E0]/90">
                    <strong>Website:</strong> miiyuh.com
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
