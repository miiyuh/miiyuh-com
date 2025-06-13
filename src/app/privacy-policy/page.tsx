'use client'

import Head from 'next/head'
import { ScrollAnimation } from '@/components/scroll-animations'
import { Breadcrumb } from '@/components/breadcrumb'
import { TypewriterText } from '@/components/animated-text'
import { ParallaxElement } from '@/components/parallax-effects'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>privacy policy | miiyuh</title>
        <meta name="description" content="comprehensive privacy policy for miiyuh.com detailing data collection and usage practices" />
      </Head>

      <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative z-10">
        <div className="container mx-auto px-6 py-8">
          <Breadcrumb />
        </div>

        <ParallaxElement speed={0.5} direction="up">
          <section className="flex-grow px-6 py-12 min-h-[70vh] max-w-4xl mx-auto">
            <ScrollAnimation animation="fadeUp" delay={0}>
              <TypewriterText 
                text="privacy policy" 
                className="text-5xl font-bold tracking-tight font-sans mb-8 text-center"
                speed={100}
              />
            </ScrollAnimation>

            <ScrollAnimation animation="fadeUp" delay={200}>
              <div className="bg-[#2A2A2A] rounded-lg p-8 mb-8 border border-[#FAF3E0]/10">
                <p className="font-serif text-xl leading-relaxed text-center text-[#FAF3E0]">
                  this privacy policy describes how your personal information is collected, used, and shared when you visit miiyuh.com.
                </p>
              </div>
            </ScrollAnimation>

            <div className="space-y-8">
              <ScrollAnimation animation="fadeUp" delay={300}>
                <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-[#FAF3E0]">
                  <h2 className="text-3xl font-bold tracking-tight font-sans mb-4 text-[#FAF3E0]">1. information we collect</h2>
                  <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]">
                    when you visit the site, we may automatically collect certain information about your device, including information about your browser, ip address, time zone, and cookies installed on your device. additionally, we may collect anonymous analytics data to understand how our site is used and to improve the user experience.
                  </p>
                  <div className="bg-[#1A1A1A] p-4 rounded border border-[#FAF3E0]/20">
                    <h3 className="font-semibold mb-2 text-[#FAF3E0]">data collected includes:</h3>
                    <ul className="list-disc list-inside space-y-1 text-[#FAF3E0]">
                      <li>device and browser information</li>
                      <li>ip address and general location</li>
                      <li>page views and user interactions</li>
                      <li>performance metrics and error logs</li>
                    </ul>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeUp" delay={400}>
                <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-[#FAF3E0]">
                  <h2 className="text-3xl font-bold tracking-tight font-sans mb-4 text-[#FAF3E0]">2. how we use your information</h2>
                  <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]">
                    we use your information to maintain and improve our website experience. your information is not shared with third parties except as necessary to comply with laws or protect our rights. all data is processed securely and in accordance with modern privacy standards.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-[#1A1A1A] p-4 rounded border border-[#FAF3E0]/20">
                      <h4 className="font-semibold mb-2 text-[#FAF3E0]">legitimate uses:</h4>
                      <ul className="list-disc list-inside space-y-1 text-[#FAF3E0] text-sm">
                        <li>site performance optimization</li>
                        <li>security monitoring</li>
                        <li>user experience improvements</li>
                      </ul>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded border border-[#FAF3E0]/20">
                      <h4 className="font-semibold mb-2 text-[#FAF3E0]">data protection:</h4>
                      <ul className="list-disc list-inside space-y-1 text-[#FAF3E0] text-sm">
                        <li>encrypted data transmission</li>
                        <li>minimal data collection</li>
                        <li>regular security audits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeUp" delay={500}>
                <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-[#FAF3E0]">
                  <h2 className="text-3xl font-bold tracking-tight font-sans mb-4 text-[#FAF3E0]">3. your rights</h2>
                  <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]">
                    you have the right to access, correct, or delete your personal information. if you would like to exercise these rights, please contact us. we are committed to respecting your privacy choices and will respond to requests promptly.
                  </p>
                  <div className="bg-[#1A1A1A] p-4 rounded border border-[#FAF3E0]/20">
                    <p className="text-[#FAF3E0] text-sm">
                      <strong>contact:</strong> reach out through any of the social platforms listed on our 
                      <a href="/socials" className="text-[#FAF3E0] hover:underline ml-1">socials page</a>
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeUp" delay={600}>
                <div className="bg-[#252525] rounded-lg p-6 border-l-4 border-[#FAF3E0]">
                  <h2 className="text-3xl font-bold tracking-tight font-sans mb-4 text-[#FAF3E0]">4. changes to this policy</h2>
                  <p className="font-serif text-lg leading-relaxed mb-4 text-[#FAF3E0]">
                    we may update this privacy policy from time to time to reflect changes to our practices or for legal reasons. updated versions will be posted here with clear notification of significant changes.
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
            </div>
          </section>
        </ParallaxElement>
      </main>
    </>
  )
}
