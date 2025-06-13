'use client'

import Head from 'next/head'
import { ScrollAnimation } from '@/components/scroll-animations'
import { Breadcrumb } from '@/components/breadcrumb'
import { TypewriterText } from '@/components/animated-text'
import { ParallaxElement } from '@/components/parallax-effects'

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>terms of service | miiyuh</title>
        <meta name="description" content="comprehensive terms of service for miiyuh.com outlining usage terms and conditions" />
      </Head>

      <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative z-10">
        <div className="container mx-auto px-6 py-8">
          <Breadcrumb />
        </div>

        <ParallaxElement speed={0.5} direction="up">
          <section className="flex-grow px-6 py-12 min-h-[70vh] max-w-4xl mx-auto">
            <ScrollAnimation animation="fadeUp" delay={0}>
              <TypewriterText 
                text="terms of service" 
                className="text-5xl font-bold tracking-tight font-sans mb-8 text-center"
                speed={100}
              />
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={200}>
              <div className="bg-[#2A2A2A] rounded-lg p-8 mb-8 border border-[#FAF3E0]/10">
                <p className="font-serif text-xl leading-relaxed text-center text-[#FAF3E0]">
                  by accessing and using miiyuh.com, you agree to the following terms and conditions. please read them carefully.
                </p>
              </div>
            </ScrollAnimation>

            <div className="space-y-8">
              <ScrollAnimation animation="fadeUp" delay={300}>
                <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-[#FAF3E0]">
                  <h2 className="text-3xl font-bold tracking-tight font-sans mb-4 text-[#FAF3E0]">1. use of the site</h2>
                  <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]">
                    you may use this site for lawful purposes only. you agree not to engage in any activity that may harm, disrupt, or interfere with the site&apos;s operation or the experience of other users.
                  </p>
                  <div className="bg-[#1A1A1A] p-4 rounded border border-[#FAF3E0]/20">
                    <h3 className="font-semibold mb-2 text-[#FAF3E0]">prohibited activities include:</h3>
                    <ul className="list-disc list-inside space-y-1 text-[#FAF3E0]">
                      <li>attempting to gain unauthorized access</li>
                      <li>interfering with site functionality</li>
                      <li>uploading malicious content</li>
                      <li>violating intellectual property rights</li>
                    </ul>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeUp" delay={400}>
                <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-[#FAF3E0]">
                  <h2 className="text-3xl font-bold tracking-tight font-sans mb-4 text-[#FAF3E0]">2. intellectual property</h2>
                  <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]">
                    all content on this site, including text, images, and designs, is owned by miiyuh unless otherwise stated. you may not reproduce, distribute, or create derivative works without permission.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-[#1A1A1A] p-4 rounded border border-[#FAF3E0]/20">
                      <h4 className="font-semibold mb-2 text-[#FAF3E0]">protected content:</h4>
                      <ul className="list-disc list-inside space-y-1 text-[#FAF3E0] text-sm">
                        <li>original photography</li>
                        <li>digital artwork</li>
                        <li>written content</li>
                        <li>site design & code</li>
                      </ul>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded border border-[#FAF3E0]/20">
                      <h4 className="font-semibold mb-2 text-[#FAF3E0]">fair use:</h4>
                      <ul className="list-disc list-inside space-y-1 text-[#FAF3E0] text-sm">
                        <li>personal viewing</li>
                        <li>educational reference</li>
                        <li>critical commentary</li>
                        <li>non-commercial sharing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeUp" delay={500}>
                <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-[#FAF3E0]">
                  <h2 className="text-3xl font-bold tracking-tight font-sans mb-4 text-[#FAF3E0]">3. limitation of liability</h2>
                  <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]">
                    miiyuh is not responsible for any damages resulting from your use of this site or any content provided herein. the site is provided &quot;as is&quot; without warranties of any kind.
                  </p>
                  <div className="bg-[#1A1A1A] p-4 rounded border border-[#FAF3E0]/20">
                    <p className="text-[#FAF3E0] text-sm">
                      <strong>disclaimer:</strong> while we strive to provide accurate and up-to-date information, 
                      we make no guarantees about the completeness, accuracy, or reliability of the content.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeUp" delay={600}>
                <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-[#FAF3E0]">
                  <h2 className="text-3xl font-bold tracking-tight font-sans mb-4 text-[#FAF3E0]">4. changes to the terms</h2>
                  <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]">
                    we may update these terms from time to time. continued use of the site after changes indicates your acceptance of the new terms. significant changes will be clearly communicated.
                  </p>
                  <div className="bg-[#1A1A1A] p-4 rounded border border-[#FAF3E0]/20">
                    <p className="text-[#FAF3E0] text-sm">
                      <strong>last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeUp" delay={700}>
                <div className="bg-[#2A2A2A] rounded-lg p-6 border border-[#FAF3E0]/20">
                  <h2 className="text-2xl font-bold tracking-tight font-sans mb-4 text-[#FAF3E0]">contact information</h2>
                  <p className="font-serif text-lg leading-relaxed text-[#FAF3E0]">
                    if you have any questions about these terms of service, please reach out through any of the platforms listed on our 
                    <a href="/socials" className="text-[#FAF3E0] hover:underline ml-1">socials page</a>.
                  </p>
                </div>
              </ScrollAnimation>
            </div>
          </section>
        </ParallaxElement>
      </main>
    </>
  )
}
