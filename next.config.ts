import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
    ],
  },
  webpack: (config) => {
    // Decap CMS için frontmatter-markdown-loader
    config.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['react-component'] }
    });

    return config;
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/cms',
  //       destination: '/cms/index.html',
  //     },
  //     {
  //       source: '/cms/:path*',
  //       destination: '/cms/:path*',
  //     },
  //     {
  //       source: '/admin',
  //       destination: '/admin/index.html',
  //     },
  //     {
  //       source: '/admin/:path*',
  //       destination: '/admin/:path*',
  //     },
  //   ];
  // },
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'origin-when-cross-origin',
  //         },
  //       ],
  //     },
  //   ];
  //   },
};

export default nextConfig;