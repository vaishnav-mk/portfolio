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
        <div className="outline text-center rounded-md">
          <div className="p-5 btn btn-ghost rounded-none text-lg h-auto w-full gap-2">
            Someone clearly took the wrong turn. Return to civilization by
            clicking{' '}
            <b>
              <Link href="/">here</Link>
            </b>{' '}
            or the avatar!
          </div>
          <Link href="/">
            <img
              src="https://http.cat/404"
              className="w-full flex flex-wrap justify-center transition ease-in-out delay-4000 hover:animate-pulse rounded-b-md"
              alt="error 404 cat"
            ></img>
          </Link>
        </div>
      </MainLayout>
    </>
  )
}
