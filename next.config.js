/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  env: {
    TUNNEL: process.env.TUNNEL,
    PANEL: process.env.PANEL
  }
}

module.exports = nextConfig
