/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/webp'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig

