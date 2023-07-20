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
    tunnel: process.env.tunnel,
    panel: process.env.panel
  }
}

module.exports = nextConfig
