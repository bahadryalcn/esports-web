import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
  images: {
    domains: ['res.cloudinary.com', 'cloudinary.com'],
    formats: ['image/avif', 'image/webp'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    unoptimized: false,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Decap CMS için frontmatter-markdown-loader
    config.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['react-component'] },
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
      {
        source: '/admin/(.*)',
        destination: '/admin/$1',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/admin/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  serverExternalPackages: ['tinacms'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
