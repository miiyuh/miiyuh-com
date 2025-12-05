import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    qualities: [45, 60, 75, 85, 90],
    unoptimized: process.env.NODE_ENV === 'development',
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