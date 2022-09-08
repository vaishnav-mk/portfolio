import NextLink from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import { RouteData } from 'data/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export const DropLink = ({
  page,
  href,
  setActive,
  icon,
}: {
  page: string
  href: string
  icon?: IconProp
  setActive?: (active: boolean) => void
}) => {
  return (
    <NextLink href={href}>
      <li>
        <a className="active:bg-butDark hover:outline-lightText hover:animation-pulse duration-500">
          {icon && <FontAwesomeIcon className="w-4 h-4" icon={icon} />}
          {page}
        </a>
      </li>
    </NextLink>
  )
}

export const Dropdown = () => {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost hover:rounded-none hover:rounded-t-xl active:bg-butDark"
      >
        <FontAwesomeIcon className="w-4 h-4" icon={['fas', 'ellipsis']} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 bg-bgLight dark:bg-cardDark rounded-b-xl w-52 rounded-tl-xl shadow-sm"
      >
        {RouteData.filter((route) => route.type === 'dropdown').map((route) => (
          <DropLink
            key={uuidv4()}
            page={route.name}
            href={route.href}
            icon={route.icon}
          />
        ))}
      </ul>
    </div>
  )
}
