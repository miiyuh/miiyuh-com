/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

import { notFound } from 'next/navigation'

// Note: Next.js's dev-mode parallel route evaluation for this optional
// catch-all segment ([[...segments]]) can hit this boundary speculatively
// even on requests that go on to resolve successfully (200) immediately
// after — so a console.warn here is noise, not a signal of an actual
// broken route. Removed; notFound() still fires correctly for genuine
// unmatched /admin/* paths.
export default async function NotFound() {
  notFound()
}