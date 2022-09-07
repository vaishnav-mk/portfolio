import NextLink from 'next/link'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Dropdown } from './Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route, RouteData } from '../../data/routes'
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons'

const NavbarItem = ({ name, href, icon }: Omit<Route, 'type'>) => {
  return (
    <NextLink href={href}>
      <a aria-label={name} className="btn btn-ghost gap-1">
        {icon && <FontAwesomeIcon className="w-4 h-4" icon={icon} />}
        {name !== 'home' && <span>{name}</span>}
      </a>
    </NextLink>
  )
}

export const Navbar = () => {
  return (
    <div className="navbar rounded-b-xl bg-bgLight dark:bg-bgDark mx-auto max-w-4xl shadow-xl z-50 sticky top-0 backdrop-filter backdrop-blur-md bg-opacity-30">
      <div className="flex-1">
        <NextLink href="/">
          <a>
            <div className="btn btn-ghost gap-2">
              <div className="w-10 mask mask-squircle">
                <Image
                  src="/profile.gif"
                  alt="Picture of the author"
                  width={500}
                  height={500}
                />
              </div>
              <div className="badge badge-outline">
                <FontAwesomeIcon className="w-4 h-4" icon={['fas', 'house']} />
              </div>
            </div>
          </a>
        </NextLink>
      </div>
      <div className="flex-none gap-5">
        <div className="btn-group">
          <ThemeSwitcher />
          {RouteData.filter((route) => route.type !== 'dropdown').map(
            (route) => (
              <NavbarItem
                key={uuidv4()}
                name={route.name}
                href={route.href}
                icon={route.icon}
              />
            ),
          )}
        </div>
        <Dropdown />
      </div>
    </div>
  )
}
