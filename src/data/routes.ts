import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface Route {
  name: string
  href: string
  type?: string
  icon?: IconProp
}

export const RouteData: Route[] = [
  {
    name: 'resume',
    href: '/resume',
    icon: ['fas', 'file'],
  },
  {
    name: 'blog',
    href: '/blog',
    icon: ['fas', 'square-rss'],
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
    name: 'contact',
    href: '/contact',
    type: 'dropdown',
    icon: ['fas', 'paper-plane'],
  },
]
