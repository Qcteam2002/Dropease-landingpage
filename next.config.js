/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  eslint: {
    // 🚫 Tắt ESLint khi build để tránh lỗi cấu hình cũ
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;