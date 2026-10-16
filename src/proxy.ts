import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, splitLocalePath } from "@/lib/locale";

// Public pages live under app/(my-app)/[locale]. The default locale is served
// at unprefixed URLs (/blog), so rewrite those to /en/blog internally; prefixed
// URLs (/ms/blog) already match the route. Pages stay static/ISR because the
// locale comes from the URL, not a cookie or header.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { locale, path } = splitLocalePath(pathname);

  // /en/... duplicates the unprefixed URL; send visitors to the canonical one
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url, 308);
  }

  if (locale !== DEFAULT_LOCALE) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Everything except the Payload admin/API, Next internals, and files with
    // an extension (public assets, sitemap.xml, robots.txt, .well-known/*).
    "/((?!admin|api|graphql|_next|.*\\..*).*)",
  ],
};
