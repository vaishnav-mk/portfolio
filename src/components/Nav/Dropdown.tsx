import NextLink from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import { RouteData } from 'data/routes'

export const DropLink = ({
  page,
  href,
  setActive,
}: {
  page: string
  href: string
  setActive?: (active: boolean) => void
}) => {
  return (
    <NextLink href={href}>
      <li className="rounded-t-lg">
        <a className="rounded-t-lg">{page}</a>
      </li>
    </NextLink>
  )
}

export const Dropdown = () => {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost hover:rounded-none hover:rounded-t-xl"
      >
        More Info...
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 bg-bgLight dark:bg-cardDark rounded-b-xl w-52 rounded-tl-xl shadow-sm"
      >
        {RouteData.filter((route) => route.type === 'dropdown').map((route) => (
          <DropLink key={uuidv4()} page={route.name} href={route.href} />
        ))}
      </ul>
    </div>
  )
}
