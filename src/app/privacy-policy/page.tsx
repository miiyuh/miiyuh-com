'use client'

import Head from 'next/head'
import { InteractiveDotsBackground } from '@/components/effects/interactive-dots-background'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>privacy policy | miiyuh</title>
        <meta name="description" content="privacy policy for miiyuh.com" />
      </Head>

      <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans relative">
        {/* Interactive dots background */}
        <InteractiveDotsBackground />
        <section className="relative flex-grow px-6 py-12 min-h-[70vh] max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight font-sans mb-6">privacy policy</h1>

          <p className="font-serif text-lg leading-relaxed mb-6">
            this privacy policy describes how your personal information is collected, used, and shared when you visit miiyuh.com.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-2">1. information we collect</h2>
          <p className="font-serif text-lg leading-relaxed mb-4">
            when you visit the site, we may automatically collect certain information about your device, including information about your browser, ip address, time zone, and cookies installed on your device.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-2">2. how we use your information</h2>
          <p className="font-serif text-lg leading-relaxed mb-4">
            we use your information to maintain and improve our website experience. your information is not shared with third parties except as necessary to comply with laws or protect our rights.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-2">3. your rights</h2>
          <p className="font-serif text-lg leading-relaxed mb-4">
            you have the right to access, correct, or delete your personal information. if you would like to exercise these rights, please contact us.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-2">4. changes to this policy</h2>
          <p className="font-serif text-lg leading-relaxed mb-4">
            we may update this privacy policy from time to time to reflect changes to our practices or for legal reasons. updated versions will be posted here.
          </p>
        </section>
      </main>
    </>
  )
}
