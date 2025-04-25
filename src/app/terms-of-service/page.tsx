import Head from 'next/head'

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>terms of service | miiyuh.com</title>
        <meta name="description" content="Terms of Service for using miiyuh.com" />
      </Head>

      <div className="min-h-screen bg-[#1A1A1A] text-[#FAF3E0] p-6">
        <div className="max-w-3xl mx-auto bg-[#1A1A1A] p-6 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">terms of service</h1>

          <p className="mb-6">
            welcome to miiyuh.com! by using this website, you agree to the following terms and conditions. please read them carefully.
          </p>

          <h2 className="text-2xl font-semibold mb-2">1. acceptance of terms</h2>
          <p className="mb-4">
            by accessing and using this website, you accept and agree to comply with the terms and conditions outlined below. if you disagree with any part of these terms, you are prohibited from using the website.
          </p>

          <h2 className="text-2xl font-semibold mb-2">2. use of content</h2>
          <p className="mb-4">
            all content on this website, including images, text, and videos, is protected by copyright laws. you may not use or redistribute any content without permission.
          </p>

          <h2 className="text-2xl font-semibold mb-2">3. limitation of liability</h2>
          <p className="mb-4">
            miiyuh.com is not responsible for any damages resulting from the use of the website, including but not limited to loss of data or access issues.
          </p>

          <h2 className="text-2xl font-semibold mb-2">4. governing law</h2>
          <p className="mb-4">
            these terms are governed by the laws of malaysia. any disputes related to these terms shall be resolved in the jurisdiction of malaysian courts.
          </p>

          <h2 className="text-2xl font-semibold mb-2">5. changes to terms</h2>
          <p className="mb-4">
            miiyuh.com reserves the right to update or modify these terms at any time without notice. we recommend reviewing this page periodically to stay informed of any changes.
          </p>

          <p className="mt-6 text-center">
            © 2025 miiyuh | all rights reserved
          </p>
        </div>
      </div>
    </>
  )
}