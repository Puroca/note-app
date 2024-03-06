/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      'mongodb-client-encryption': false,
      aws4: false,
    }

    return config
  },

  experimental:{
    serverActions:{
      allowedOrigins: ['the-sits.com', 'localhost:3000']
    }
  }
}

export default nextConfig;
