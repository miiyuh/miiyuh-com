import { withPayload } from "@payloadcms/next/withPayload";

// Dev-only allowance so impeccable live mode can load.
const __impeccableLiveDev =
  process.env.NODE_ENV === "development" ? " http://localhost:8400" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: [
      "@phosphor-icons/react",
      "@ark-ui/react",
      "fumadocs-core",
      "fumadocs-ui",
      "lucide-react",
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

  // Suppress source map warnings from node_modules
  productionBrowserSourceMaps: false,

  images: {
    formats: ["image/webp", "image/avif"],
    qualities: [75, 80, 85],
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
        // HTML pages and public routes: security headers + CSP
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              `default-src 'self' data:; base-uri 'self'; block-all-mixed-content; font-src 'self' https://fonts.gstatic.com https://rsms.me data:; img-src 'self' data: blob: https:; manifest-src 'self' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://rsms.me; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://rybbit.miiyuh.com https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com${__impeccableLiveDev}; connect-src 'self' https://rybbit.miiyuh.com https://*.vercel-insights.com https://api.vercel.com https://*.cloudflare.com https://fonts.googleapis.com https://fonts.gstatic.com https://rsms.me${__impeccableLiveDev}; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests;`,
          },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'X-XSS-Protection', value: '0' },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
