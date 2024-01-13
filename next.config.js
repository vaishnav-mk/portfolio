module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['skillicons.dev', 'i.scdn.co', 'http.cat', 'www.udemy.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
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
        destination: 'https://www.linkedin.com/in/vaishnav-mk/',
        permanent: true,
      },
      {
        source: '/leetcode',
        destination: 'https://leetcode.com/vaishnavmanoj/',
        permanent: true,
      },
      {
        source: '/view-resume',
        destination:
          'https://drive.google.com/file/d/1X-6ZBfiRPC9WZx3f9Pih8gE49WQRoQ9X/view?usp=sharing',
        permanent: true,
      },
      {
        source: '/secret',
        destination: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        permanent: true,
      },
    ]
  },
}
