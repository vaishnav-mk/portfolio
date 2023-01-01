import NextLink from 'next/link'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Dropdown } from './Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route, RouteData } from '../../data/routes'

const NavbarItem = ({ name, href, icon, locked }: Omit<Route, 'type'>) => {
  return (
    <NextLink href={href}>
      <div
        aria-label={name}
        className={`btn btn-ghost gap-1 active:bg-butDark ${
          locked ? 'btn-disabled' : ''
        }`}
      >
        {icon && <FontAwesomeIcon className="w-4 h-4" icon={icon} />}
        {name !== 'home' && <span>{name}</span>}
        {locked ? (
          <div className="my-4 relative z-10">
            <div className="absolute -left-7 -top-7 z-[-1] badge badge-xs badge-error">
              Locked
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </NextLink>
  )
}

export const Navbar = () => {
  return (
    <div className="navbar flex flex-col md:flex-row rounded-b-xl bg-bgLight dark:bg-bgDark mx-auto max-w-4xl 2xl:max-w-7xl xl:h-20 shadow-xl z-50 sticky top-0 backdrop-filter backdrop-blur-md bg-opacity-30">
      <div className="flex-1">
        <NextLink href="/">
            <div className="btn btn-ghost">
              <div className="w-10 mask mask-squircle">
                <Image
                  src="/profile.webp"
                  alt="vaishnav profile"
                  className="rounded-xl rounded-tl-none"
                  width={300}
                  height={300}
                />
              </div>
            </div>
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
                locked={route.locked}
              />
            ),
          )}
        </div>
        <Dropdown />
      </div>
    </div>
  )
}
