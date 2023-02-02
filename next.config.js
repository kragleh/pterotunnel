/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    URL: process.env.URL,
    TOKEN: process.env.TOKEN
  }
}

module.exports = nextConfig
