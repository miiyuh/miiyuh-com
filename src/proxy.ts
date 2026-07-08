import { NextRequest, NextResponse } from "next/server";

const isDev = process.env.NODE_ENV === "development";

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // Skip enforcing CSP in dev: Turbopack/HMR needs eval and other
  // allowances that would otherwise have to be duplicated here.
  if (isDev) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const csp = `default-src 'self' data:; base-uri 'self'; block-all-mixed-content; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; manifest-src 'self' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; frame-src 'self' https://www.youtube.com https://player.vimeo.com; object-src 'none'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://rybbit.miiyuh.com https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://rybbit.miiyuh.com https://*.vercel-insights.com https://api.vercel.com https://*.cloudflare.com https://fonts.googleapis.com https://fonts.gstatic.com; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests;`;

  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    // Apply everywhere except the Payload admin panel (which keeps its own
    // looser CSP in next.config.mjs for Monaco/code editors), static assets,
    // and API/GraphQL routes.
    "/((?!admin|api|graphql|_next/static|_next/image|favicon.ico).*)",
  ],
};
