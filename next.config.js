/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'catpurre.pl', 's3.amazonaws.com'],
    formats: ['image/avif', 'image/webp']
  },
  i18n: {
    locales: ['pl', 'en', 'de', 'ru'],
    defaultLocale: 'pl'
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.SERVER_URL || 'http://localhost:5000',
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.GEMINI_API_KEY
  }
}

module.exports = nextConfig
