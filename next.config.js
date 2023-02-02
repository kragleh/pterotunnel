/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    PANEL: process.env.PANEL,
    TOKEN: process.env.TOKEN
  }
}

module.exports = nextConfig
