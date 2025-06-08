/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enables React's Strict Mode, which helps identify potential problems in an app.
  // It's a key part of building resilient, future-proof React applications.
  reactStrictMode: true,

  // Future-proofing note: If OpenBot9000 were to display images
  // from external sources (e.g., user avatars), we would configure the domains here
  // for Next.js Image Optimization.
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'example.com',
  //       port: '',
  //       pathname: '/images/**',
  //     },
  //   ],
  // },
};

export default nextConfig;