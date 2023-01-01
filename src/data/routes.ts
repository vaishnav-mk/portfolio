import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface Route {
  name: string
  href: string
  type?: string
  icon?: IconProp
  locked?: boolean
  hex?: string
}

export const RouteData: Route[] = [
  {
    name: 'resume',
    href: '/resume',
    icon: ['fas', 'file'],
    locked: false,
  },
  {
    name: 'blog',
    href: '/blog',
    icon: ['fas', 'square-rss'],
    locked: false,
  },
  {
    name: 'open source',
    href: '/opensource',
    icon: ['fas', 'heart'],
    type: 'dropdown',
    hex: '#d6336c',
  },
  {
    name: 'projects',
    href: '/projects',
    icon: ['fas', 'list-check'],
    type: 'dropdown',
  },
  {
    name: 'stack',
    href: '/skills',
    type: 'dropdown',
    icon: ['fas', 'square-check'],
  },
  {
    name: 'certificates',
    href: '/certificates',
    type: 'dropdown',
    icon: ['fas', 'ranking-star'],
    locked: false,
  },
  {
    name: 'contact',
    href: '/contact',
    type: 'dropdown',
    icon: ['fas', 'paper-plane'],
  },
  {
    name: 'involvement',
    href: '/involvement',
    type: 'dropdown',
    icon: ['fas', 'id-badge'],
    locked: true,
  },
]
