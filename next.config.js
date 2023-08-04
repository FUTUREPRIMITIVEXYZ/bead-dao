// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
// const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/scan',
  //       destination: 'https://t.me/beaddao',
  //       permanent: false,
  //     },
  //   ]
  // },
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'media.giphy.com',
      //   'nft-cdn.alchemy.com',
      //   'cloudflare-ipfs.com',
      //   'api.zora.co',
      //   'gateway.pinata.cloud',
      //   'ipfs.io',
      //   'res.cloudinary.com',
      //   'api.bitski.com',
      //   'i.seadn.io',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nft-cdn.alchemy.com',
        port: '',
        pathname: '/eth-mainnet/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
