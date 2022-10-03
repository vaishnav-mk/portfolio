import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import { RouteData } from 'data/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
export const DropLink = ({
  page,
  href,
  setActive,
  icon,
  locked,
}: {
  page: string
  href: string
  icon?: IconProp
  setActive?: (active: boolean) => void
  locked?: boolean
}) => {
  return (
    <Link href={locked ? '#' : href}>
      <li>
        <div
          className={`mt-2 active:bg-butDark hover:outline-lightText hover:animation-pulse duration-500 ${
            locked ? 'btn-disabled' : null
          }`}
        >
          {icon && <FontAwesomeIcon className="w-4 h-4" icon={icon} />}
          {page}{' '}
          {locked ? (
            <div className="badge badge-error p-1">
              <FontAwesomeIcon className="w-4 h-4" icon={['fas', 'lock']} />
            </div>
          ) : null}
        </div>
      </li>
    </Link>
  )
}

export const Dropdown = () => {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost rounded-none rounded-t-xl active:bg-butDark"
      >
        <FontAwesomeIcon className="w-4 h-4" icon={['fas', 'ellipsis']} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 bg-bgLight dark:bg-cardDark rounded-b-xl rounded-tl-xl shadow-sm w-auto"
      >
        {RouteData.filter((route) => route.type === 'dropdown').map((route) => (
          <DropLink
            key={uuidv4()}
            page={route.name}
            href={route.href}
            icon={route.icon}
            locked={route.locked}
          />
        ))}
      </ul>
    </div>
  )
}
