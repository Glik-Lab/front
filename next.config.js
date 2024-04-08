/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: '**',
       },
       {
         protocol: 'http',
         hostname: '**',
       },
     ],
  },
  webpack: (config) => {
     config.module.rules.push({
       test: /\.node/,
       use: 'raw-loader',
     });
 
     return config;
  },
  typescript: {
     // !! WARN !!
     // Dangerously allow production builds to successfully complete even if
     // your project has type errors.
     // !! WARN !!
     ignoreBuildErrors: true,
  },
 };
 
 module.exports = nextConfig;
 