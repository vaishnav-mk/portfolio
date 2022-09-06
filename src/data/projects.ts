import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface Project {
  title: string
  description: string
  link?: string
  github?: string
  icon?: IconProp
  stack?: string[]
}

export const ProjectData: Project[] = [
  {
    title: 'This website',
    description: "The website that you're on right now!",
    link: 'google.com',
    github: '',
    stack: ['NextJS', 'TailwindCSS'],
    icon: ['fas', 'globe-europe'],
  },
  {
    title: 'Token Invalidator',
    description:
      'A service that invalidates discord tokens of users & bots that are public, thereby protecting their security',
    link: 'invalidate.vercel.com',
    github: 'SammyWhamy/token-invalidator',
    stack: [
      'Typescript',
      'NextJS',
      'TailwindCSS',
      'Prisma',
      'PostgreSQL',
      'Oauth2',
      'Rest APIs',
    ],
  },
  {
    title: 'Kciw',
    description: 'explaining wtf this bot does',
    link: 'google.com',
    github: 'github.com/nance',
    stack: ['Javascript', 'MongoDB'],
  },
  {
    title: 'password manager',
    description: 'this project randomly generated passwords for me',
    github: 'wow',
    stack: ['Python', 'MySQL'],
  },
]
