/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['cdn.sanity.io', 'm.media-amazon.com'],
  },
}

module.exports = nextConfig
