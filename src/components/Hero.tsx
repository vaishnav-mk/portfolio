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
import { AwesomeQRCode } from '@awesomeqr/react'
import QRCode from 'react-qr-code'
export default function Hero() {
  const temp = Weather()
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-5 items-center">
        <div className="relative z-10 mt-10 md:mt-0">
          <label htmlFor="egg" className="modal-button">
            <video
              src="/profile.webm"
              className="rounded-xl rounded-tl-none"
              alt="Vaishnav profile"
            />
          </label>
          <Circles color="#36D399" />
        </div>
        <div>
          <div className="text-4xl">
            Hey there!{' '}
            <h1 className="flex gap-2">
              I&apos;m{' '}
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
        <input type="checkbox" id="egg" className="modal-toggle" />
        <label htmlFor="egg" className="modal cursor-pointer">
          <label className="modal-box relative">
            <h3 className="text-lg font-bold">Oh! You've found a secret :)</h3>
            <p className="py-4">
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value="https://vaishnav.tech/secret"
                viewBox={`0 0 256 256`}
                className="rounded-t-md rounded-none"
                bgColor="#D94D2C"
                fgColor="#2E3440"
                level="L"
                includeMargin={false}
                title="secret"
              />
              <div className="text-center">
                <a
                  href="https://vaishnav.tech/secret"
                  className="btn btn-ghost w-full bg-[#434955] text-[#D94D2C] rounded-none rounded-b-md gap-2"
                >
                  <FontAwesomeIcon
                    className="w-4 h-4"
                    icon={['fas', 'external-link-alt']}
                  />
                  Open
                </a>
              </div>
            </p>
          </label>
        </label>
      </div>
    </>
  )
}
