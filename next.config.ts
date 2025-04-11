import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Proper server actions configuration
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // or whatever size you need
      allowedOrigins: [
        'localhost:3000', 
        'your-production-domain.com'
      ],
    },
  },

  typescript: {
    ignoreBuildErrors: true
  },

  eslint: {
    ignoreDuringBuilds: true
  },

  transpilePackages: [
    'react-icons',
    '@headlessui/react'
  ],
  
  serverExternalPackages: [
    'node-appwrite',
    'bcryptjs'
  ],
  
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
      skipDefaultConversion: true,
    },
  },
  
  webpack: (config, { isServer }) => {
    config.externals.push({
      'node:fs': 'commonjs node:fs',
      'node:path': 'commonjs node:path'
    });
    return config;
  },
  
  images: {
    domains: ['cloud.appwrite.io', 'localhost'],
  }
};

export default nextConfig;