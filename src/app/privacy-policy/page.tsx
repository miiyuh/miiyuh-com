import Head from 'next/head'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Miiyuh</title>
        <meta name="description" content="Privacy Policy for the Miiyuh website" />
      </Head>

      <div className="min-h-screen bg-[#1A1A1A] text-[#FAF3E0] p-6">
        <div className="max-w-3xl mx-auto bg-[#1A1A1A] p-6 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">privacy policy</h1>

          <p className="mb-6">
            This Privacy Policy explains how Miiyuh collects, uses, and protects your personal data. Please read this policy carefully.
          </p>

          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <p className="mb-4">
            We collect personal information such as name, email address, and browsing data when you use our website. This information is used to provide a better user experience.
          </p>

          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p className="mb-4">
            Your information may be used to personalize content, respond to inquiries, and improve website functionality. We do not share your information with third parties without your consent.
          </p>

          <h2 className="text-2xl font-semibold mb-2">3. Data Security</h2>
          <p className="mb-4">
            We take reasonable measures to protect your data from unauthorized access. However, no method of data transmission over the internet is completely secure.
          </p>

          <h2 className="text-2xl font-semibold mb-2">4. Cookies</h2>
          <p className="mb-4">
            Our website uses cookies to enhance user experience. Cookies are small files stored on your device that help us remember preferences and improve the website&apos;s performance.
          </p>

          <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
          <p className="mb-4">
            You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us via the contact form on the website.
          </p>

          <h2 className="text-2xl font-semibold mb-2">6. Changes to This Policy</h2>
          <p className="mb-4">
            Miiyuh reserves the right to update or modify this Privacy Policy at any time. We recommend reviewing this page periodically to stay informed of any changes.
          </p>

          <p className="mt-6 text-center">
            © 2025 Miiyuh | All Rights Reserved
          </p>
        </div>
      </div>
    </>
  )
}