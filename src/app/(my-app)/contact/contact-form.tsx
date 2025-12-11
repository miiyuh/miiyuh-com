'use client'

import { FormBlock } from '@/components/forms/form-block'

/**
 * ContactForm
 *
 * Client component that renders the contact-inquiry form.
 * The form is fetched from Payload CMS by its title.
 *
 * To create this form in Payload:
 * 1. Go to Admin > Forms > Create New
 * 2. Title: "contact-inquiry"
 * 3. Add fields: name (text), email (email), subject (text), message (textarea)
 * 4. Set submit button label: "Send Message"
 * 5. Configure confirmation message
 * 6. Optionally add email notification
 */
export function ContactForm() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/2 p-6 sm:p-8 backdrop-blur-md">
      <FormBlock formId="contact-inquiry" />
    </div>
  )
}

export default ContactForm
