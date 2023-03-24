/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ipfs.nftstorage.link',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
