'use client'

import Head from 'next/head'

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>terms of service | miiyuh</title>
        <meta name="description" content="terms of service for miiyuh.com" />
      </Head>

      <main className="flex flex-col bg-[#1A1A1A] text-[#FAF3E0] font-sans">
        <section className="flex-grow px-6 py-12 min-h-[70vh] max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight font-sans mb-6">terms of service</h1>

          <p className="font-serif text-lg leading-relaxed mb-6">
            by accessing and using miiyuh.com, you agree to the following terms and conditions. please read them carefully.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-2">1. use of the site</h2>
          <p className="font-serif text-lg leading-relaxed mb-4">
            you may use this site for lawful purposes only. you agree not to engage in any activity that may harm, disrupt, or interfere with the site's operation.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-2">2. intellectual property</h2>
          <p className="font-serif text-lg leading-relaxed mb-4">
            all content on this site, including text, images, and designs, is owned by miiyuh unless otherwise stated. you may not reproduce, distribute, or create derivative works without permission.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-2">3. limitation of liability</h2>
          <p className="font-serif text-lg leading-relaxed mb-4">
            miiyuh is not responsible for any damages resulting from your use of this site or any content provided herein.
          </p>

          <h2 className="text-2xl font-bold tracking-tight font-sans mt-8 mb-2">4. changes to the terms</h2>
          <p className="font-serif text-lg leading-relaxed mb-4">
            we may update these terms from time to time. continued use of the site after changes indicates your acceptance of the new terms.
          </p>
        </section>
      </main>
    </>
  )
}
