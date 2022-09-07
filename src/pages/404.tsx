import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import Link from 'next/link'

export default function Index() {
  return (
    <>
      <GenericMeta
        title="Vaishnav | 404"
        description="Oops! This page doesn't exist!"
      />

      <MainLayout margin={false}>
        <h3>
          Someone clearly took the wrong turn. Return to civilization by
          clicking{' '}
          <b>
            <Link href="/">here</Link>
          </b>{' '}
          or the avatar!
        </h3>
        <Link href="/">
          <img
            src="https://http.cat/404"
            className="w-full flex flex-wrap justify-center border border-lightText rounded-lg mb-5 px-3 py-1 bg-black transition ease-in-out delay-4000 hover:animate-pulse"
            alt="error 404 cat"
          ></img>
        </Link>
      </MainLayout>
    </>
  )
}
