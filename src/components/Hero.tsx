import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Weather } from 'components/Weather'
const Time = dynamic(() => import('components/Time'), {
  ssr: false,
})
export default function Hero() {
  const temp = Weather()
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="flex items-center sm:w-5/12">
        <img src="/profile.gif" className="rounded-xl"></img>
      </div>
      <div className="mb-8">
        <h1 className="mt-7">
          Hey there! I&apos;m{' '}
          <a className="underline-offset-2 decoration-2 underline decoration-[#36D399] select-none">
            Vaishnav
          </a>
        </h1>
        <p className="text-lg">
          <FontAwesomeIcon icon={['fas', 'info-circle']} /> Constantly pushing
          the boundaries of what I know to create weird and wonderful projects.
        </p>
        <p className="text-lg">
          <Time />
        </p>
        <p>
          <Weather />
        </p>
        <div className="mt-5 md:mt-12 btn-group grid grid-cols-2 justify-between outline outline-2 rounded-md">
          <Link href="/resume">
            <div className="btn btn-ghost dark:btn gap-2 text-lightText">
              <FontAwesomeIcon className="w-4 h-4" icon={['fas', 'file']} />
              Resume
            </div>
          </Link>
          <Link href="/contact">
            <div className="btn btn-ghost gap-2 text-lightText">
              <FontAwesomeIcon
                className="w-4 h-4"
                icon={['fas', 'paper-plane']}
              />
              Contact Me
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
