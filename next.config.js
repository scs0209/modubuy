/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['cdn.sanity.io', 'm.media-amazon.com'],
  },
}

module.exports = nextConfig
