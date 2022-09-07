module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/vaishnav-mk',
        permanent: true,
      },
    ]
  },
}
