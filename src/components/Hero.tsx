import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Weather } from 'components/Weather'
import { Circles } from './circles'
import Image from 'next/image'
const Time = dynamic(() => import('components/Time'), {
  ssr: false,
})
import { motion } from 'framer-motion'

export default function Hero() {
  const temp = Weather()
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-5 items-center">
        <div className="relative z-10">
          <Image
            src="/profile.gif"
            alt="Picture of the author"
            width={332}
            className="rounded-xl rounded-tl-none"
            height={332}
          />
          <Circles color="#36D399" />
        </div>
        <div>
          <h1>
            Hey there! I&apos;m{' '}
            <a className="underline-offset-2 decoration-2 underline decoration-[#36D399] select-none">
              Vaishnav
            </a>
          </h1>
          <div className="divider">
            <Time />
          </div>
          <div className="grid ">
            <div className="text-lg 2xl:text-2xl">
              <FontAwesomeIcon icon={['fas', 'info-circle']} /> Constantly
              pushing the boundaries of what I know to create weird and
              wonderful projects.
            </div>
            <div className="text-lg 2xl:text-2xl"></div>
            <div className="text-lg 2xl:text-2xl">
              <Weather />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 btn-group grid grid-cols-2 justify-between outline outline-2 rounded-md">
        <Link href="/resume">
          <div className="btn btn-ghost  gap-2 text-lightText rounded-md">
            <FontAwesomeIcon className="w-4 h-4" icon={['fas', 'file']} />
            Resume
          </div>
        </Link>
        <Link href="/contact">
          <div className="btn btn-ghost gap-2 text-lightText rounded-md">
            <FontAwesomeIcon
              className="w-4 h-4"
              icon={['fas', 'paper-plane']}
            />
            Contact Me
          </div>
        </Link>
      </div>
    </>
  )
}
