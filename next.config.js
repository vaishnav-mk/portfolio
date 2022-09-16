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
        destination: 'https://twitter.com/Vaishna07767409',
        permanent: true,
      },
      {
        source: '/mail',
        destination: 'mailto:vaishnav-mk@duck.com',
        permanent: true,
      },
      {
        source: '/hackerrank',
        destination: 'https://hackerrank.com/vaishnavmanoj',
        permanent: true,
      },
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/vaishnav-mk-0355b7243/',
        permanent: true,
      },
      {
        source: '/leetcode',
        destination: 'https://leetcode.com/vaishnavmanoj/',
        permanent: true,
      },
    ]
  },
}
