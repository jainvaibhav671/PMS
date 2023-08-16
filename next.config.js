/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  compiler: {
    removeConsole: false
  }
};

module.exports = nextConfig;
