import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
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