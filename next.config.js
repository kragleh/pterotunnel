/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    URL: process.env.URL,
    PANEL: process.env.PANEL
  }
}

module.exports = nextConfig
