import NextLink from 'next/link'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { ThemeSwitcher } from './ThemeSwitcher'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route, RouteData } from '../../data/routes'

const NavbarItem = ({ name, href, icon }: Omit<Route, 'type'>) => {
  return (
    <NextLink href={href}>
      <a
        aria-label={name}
        className="focus:outline-none mr-10 transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200"
      >
        <div className="avatar">
          <div className="w-24 mask mask-squircle">
            <Image
              src="../../public/profile.gif"
              alt="Picture of the author"
              width={500}
              height={500}
            />
          </div>
        </div>
      </a>
    </NextLink>
  )
}

export const Navbar = () => {
  return (
    <nav className="z-50 w-full flex justify-start items-center mx-auto max-w-4xl px-8 my-20">
      <div className="ml-auto">
        <ThemeSwitcher />
      </div>
    </nav>
  )
}
