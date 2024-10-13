/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cocktails.solvro.pl',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/cocktails',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
