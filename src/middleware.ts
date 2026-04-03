import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const isProduction = process.env.NODE_ENV === 'production'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  if (isProduction && url.pathname === '/admin/login' && url.searchParams.has('redirect')) {
    const cleanUrl = url.clone()
    cleanUrl.searchParams.delete('redirect')
    return NextResponse.redirect(cleanUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/login'],
}
