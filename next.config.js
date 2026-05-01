/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['financialmodelingprep.com'],
    unoptimized: false,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  output: 'standalone',
};

module.exports = nextConfig;
