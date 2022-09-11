module.exports = {
  reactStrictMode: true,
  webpack5: true,
  poweredByHeader: false,
  images: {
    domains: ['skillicons.dev', 'i.scdn.co'],
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/vaishnav-mk',
        permanent: true,
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/vaishnav-mk',
        permanent: true,
      },
      {
        source: '/mail',
        destination: 'mailto:vaishnav-mk@duck.com',
        permanent: true,
      },
    ]
  },
}
