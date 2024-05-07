/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.pokemondb.net',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
