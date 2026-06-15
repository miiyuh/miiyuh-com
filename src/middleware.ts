import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Content Security Policy - tuned for this site. Avoids inline scripts where possible.
const CSP = "default-src 'self' data:; base-uri 'self'; block-all-mixed-content; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; manifest-src 'self' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' https://rybbit.miiyuh.com https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://rybbit.miiyuh.com https://*.vercel-insights.com https://api.vercel.com https://*.cloudflare.com https://fonts.googleapis.com https://fonts.gstatic.com; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests;"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Don't run middleware for static files, images, API routes or next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const res = NextResponse.next()

  // Apply security headers for pages only
  res.headers.set('Content-Security-Policy', CSP)
  res.headers.set('X-Frame-Options', 'SAMEORIGIN')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
  res.headers.set('X-XSS-Protection', '0')

  return res
}

// Run middleware for all non-static, non-api routes
export const config = {
  matcher: ['/(.*)'],
}
