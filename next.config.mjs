import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ['lucide-react', '@ark-ui/react'],
  },

  // Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Suppress source map warnings from node_modules
  productionBrowserSourceMaps: false,

  images: {
    formats: ['image/webp', 'image/avif'],
    qualities: [75, 80, 85],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      { protocol: 'https', hostname: 'miiyuh.com' },
      { protocol: 'https', hostname: 'preview.miiyuh.com' },
      { protocol: 'https', hostname: '*.r2.cloudflarestorage.com' },
    ],
  },

  // Enable gzip compression (still valid)
  compress: true,
}

export default withPayload(nextConfig)