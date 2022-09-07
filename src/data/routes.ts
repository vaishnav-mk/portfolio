import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface Route {
  name: string
  href: string
  type?: string
  icon?: IconProp
}

export const RouteData: Route[] = [
  {
    name: 'projects',
    href: '/projects',
    icon: ['fas', 'globe-europe'],
  },
  {
    name: 'blog',
    href: '/blog',
    icon: ['fas', 'globe-europe'],
  },
  {
    name: 'stack',
    href: '/skills',
    type: 'dropdown',
  },
  {
    name: 'setup',
    href: '/setup',
    type: 'dropdown',
  },
  {
    name: 'albums',
    href: '/albums',
    type: 'dropdown',
  },
]
