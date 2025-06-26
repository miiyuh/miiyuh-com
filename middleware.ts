import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle PayloadCMS admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Rewrite admin routes to PayloadCMS
    return NextResponse.rewrite(new URL('/api/admin' + request.nextUrl.pathname.replace('/admin', ''), request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
