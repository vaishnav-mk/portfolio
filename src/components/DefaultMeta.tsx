import Head from 'next/head'

interface Props {
  title: string
  description: string
}

export const GenericMeta = ({ title, description }: Props) => {
  return (
    <Head>
      <link rel="preconnect" href="https://vitals.vercel-insights.com" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <title>{title}</title>
      <meta name="author" content="Vaishnav" />
      <meta name="theme-color" content="#36D399" />
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Vaishnav" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content="https://vaishnav.tech" />
      <meta property="og:image" content="/profile.gif" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Vaishna07767409" />
      <meta name="twitter:creator" content="@Vaishna07767409" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/profile.gif" />
    </Head>
  )
}
