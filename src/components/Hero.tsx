import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Weather } from 'components/Weather'
import { Circles } from './circles'
import Image from 'next/image'
const Time = dynamic(() => import('components/Time'), {
  ssr: false,
})
export default function Hero() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-5 items-center">
        <div className="relative z-10 mt-10 md:mt-0">
          <label htmlFor="egg" className="modal-button">
            <Image
              src="/hero.webp"
              alt="vaishnav profile"
              className="rounded-xl rounded-tl-none hover:hue-rotate-90 transition-all duration-500 scale-75 hover:scale-100 rotate-6 hover:rotate-0 cursor-pointer"
              width={400}
              height={400}
              placeholder="blur"
              blurDataURL="/profile.webp"
              priority
            />
          </label>
          <Circles color="#36D399" />
        </div>
        <div>
          <div className="text-4xl">
            Hey there!
            <h1 className="flex gap-2">
              I&apos;m
              <div className="text-butLight hover:text-bgDark hover:dark:text-bgLight transition-colors duration-500 underline-offset-2 decoration-2 underline decoration-[#36D399] select-none">
                Vaishnav
              </div>
            </h1>
          </div>
          <div className="divider">
            <Time />
          </div>
          <div className="grid ">
            <div className="text-lg 2xl:text-2xl">
              <FontAwesomeIcon icon={['fas', 'info-circle']} /> Constantly
              pushing the boundaries of what I know to create weird and
              wonderful projects.
            </div>
            <div className="text-lg 2xl:text-2xl">
              <Weather />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 btn-group grid grid-cols-3 justify-between outline outline-2 rounded-md h-auto">
        <Link href="/resume">
          <div className="btn btn-ghost  gap-2 text-lightText rounded-md">
            <FontAwesomeIcon className="w-4 h-4" icon={['fas', 'file']} />
            Resume
          </div>
        </Link>
        <Link href="/blog" className="join-item">
          <button className="btn btn-ghost gap-2 rounded-md join-item w-full text-white bg-stripes bg-stripes-red-500 border border-r-1 h-auto">
            <div className="badge badge-error rounded-md text-black h-auto p-1">
              <span className="ml-1">Read My Blogs</span>
            </div>
          </button>
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
        <input type="checkbox" id="egg" className="modal-toggle" />
        <label
          htmlFor="egg"
          className="modal cursor-pointer bg-slate-300 dark:bg-slate-600"
        >
          <label className="modal-box relative bg-slate-400 dark:bg-slate-700">
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
              🥚 Oh, you found the secret! :)
            </h3>
            <div className="py-4">
              <Image
                src="/secret.svg"
                alt="secret"
                width={500}
                height={500}
                className="rounded-md"
              />
              <Link href="/secret">
                <div className="btn btn-ghost w-full bg-slate-500 dark:bg-[#434955] text-slate-700 dark:text-[#D94D2C] rounded-none rounded-b-md gap-2 h-auto p-3 shadow-xl">
                  <div className="badge gap-2 badge-error rounded-md badge-outline badge-lg h-auto animate-bounce">
                    QR Code not working? Click here!
                  </div>
                </div>
              </Link>
            </div>
          </label>
        </label>
      </div>
    </>
  )
}
