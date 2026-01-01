import type { Metadata } from 'next'
import { SimpleBreadcrumb } from '@/components/ui/simple-breadcrumb'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me for inquiries, collaborations, or just to say hello.',
  openGraph: {
    title: 'Contact | miiyuh',
    description: 'Get in touch with me for inquiries, collaborations, or just to say hello.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen overflow-hidden">
      <section
        className="relative grow px-6 md:px-12 lg:px-24 xl:px-32 py-24 min-h-[70vh]"
        style={{ paddingTop: '24px' }}
      >
        <div>
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <SimpleBreadcrumb
              items={[
                { label: 'home', href: '/' },
                { label: 'contact' },
              ]}
            />
          </div>

          {/* Page Heading */}
          <div className="mb-12 border-b border-white/10 pb-6">
            <h1 className="text-4xl md:text-5xl uppercase tracking-widest mb-4 text-white">
              contact_
            </h1>
            <p className="text-lg text-white/70 max-w-2xl">
              Have a question, idea, or just want to connect? Fill out the form
              below and I&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
