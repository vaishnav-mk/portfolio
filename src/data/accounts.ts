import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface Account {
  name: string
  href?: string
  icon?: IconProp
  copyEmail?: () => void
}

export const AccountData: Account[] = [
  {
    name: 'GitHub',
    href: '/github',
  },
  {
    name: 'Twitter',
    href: '/twitter',
  },
  {
    name: 'Email',
    icon: ['fas', 'envelope'],
  },
]
