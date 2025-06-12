/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache for images
  },
  experimental: {
    optimizePackageImports: ['lightgallery'],
  },
  compress: true,
}

export default nextConfig
