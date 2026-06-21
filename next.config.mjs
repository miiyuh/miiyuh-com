import { withPayload } from "@payloadcms/next/withPayload";

// Dev-only allowance so impeccable live mode can load.
const __impeccableLiveDev =
  process.env.NODE_ENV === "development" ? " http://localhost:8400" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['100.85.118.33'],

  experimental: {
    optimizePackageImports: [
      "@phosphor-icons/react",
      "@ark-ui/react",
      "fumadocs-core",
      "fumadocs-ui",
    ],
  },

  // Required for Payload CMS on Vercel
  serverExternalPackages: ["sharp", "graphql"],

  // Turbopack configuration
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // Rewrite extensionless well-known paths to actual files for correct Content-Type
  async rewrites() {
    return [
      {
        source: '/.well-known/api-catalog',
        destination: '/.well-known/api-catalog.json',
      },
    ];
  },

  // Suppress source map warnings from node_modules
  productionBrowserSourceMaps: false,

  images: {
    formats: ["image/webp", "image/avif"],
    qualities: [100, 85, 80, 75],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "3000" },
      { protocol: "https", hostname: "miiyuh.com" },
      { protocol: "https", hostname: "preview.miiyuh.com" },
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "*.r2.dev" },
    ],
  },

  // Enable gzip compression (still valid)
  compress: true,

  // Webpack configuration to handle Payload favicon correctly
  webpack: (config) => {
    // Fix for Payload favicon duplicate requests - exclude it from bundling
    config.module.rules.push({
      test: /payload-favicon.*\.png/,
      type: "asset",
      generator: {
        emit: false, // Don't emit favicon, prevent duplicate requests
      },
    });
    return config;
  },
  // Global security and caching headers (fine-grained)
  async headers() {
    return [
      {
        source: '/assets/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // API routes: apply security headers but avoid forcing caching so dynamic data stays fast
        source: '/api/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'X-XSS-Protection', value: '0' },
        ],
      },
      {
        // Homepage: Link headers for agent discovery (RFC 8288)
        source: '/',
        headers: [
          {
            key: 'Link',
            value:
              '</.well-known/api-catalog>; rel="api-catalog", </api>; rel="service-desc", </graphql>; rel="service-desc"',
          },
        ],
      },
      ...(process.env.NODE_ENV === 'development'
        ? []
        : [{
            // HTML pages and public routes: security headers + CSP
            source: '/(.*)',
            headers: [
              {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload',
              },
              {
                key: 'Content-Security-Policy',
                value:
                  `default-src 'self' data:; base-uri 'self'; block-all-mixed-content; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; manifest-src 'self' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; frame-src 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://rybbit.miiyuh.com https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com${__impeccableLiveDev}; connect-src 'self' https://rybbit.miiyuh.com https://*.vercel-insights.com https://api.vercel.com https://*.cloudflare.com https://fonts.googleapis.com https://fonts.gstatic.com${__impeccableLiveDev}; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests;`,
              },
              { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
              { key: 'X-Content-Type-Options', value: 'nosniff' },
              { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
              { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
              { key: 'X-XSS-Protection', value: '0' },
            ],
          }]),
    ];
  },
};

export default withPayload(nextConfig);
