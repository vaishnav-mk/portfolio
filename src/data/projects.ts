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
    title: 'vaishnav.tech',
    description:
      "The website that you're on right now! (Thanks to acollier.dev for making his website public as some features were borrowed from his.)",
    link: 'vaishnav.tech',
    github: 'https://github.com/vaishnav-mk/portfolio',
    stack: ['Typescript', 'NextJS', 'TailwindCSS'],
    icon: ['fas', 'earth-asia'],
  },
  {
    title: 'Token Invalidator',
    description:
      'A service that invalidates discord tokens of users & bots that are public, thereby protecting their security',
    link: 'invalidate.vercel.com',
    github: 'https://github.com/SammyWhamy/token-invalidator',
    stack: [
      'Typescript',
      'NextJS',
      'TailwindCSS',
      'Prisma',
      'PostgreSQL',
      'Oauth2',
      'Rest APIs',
    ],
    icon: ['fas', 'file-shield'],
  },
  {
    title: 'Tasks List',
    description:
      'A simple task list made in svelte (idea from frontendmentor.io)',
    link: 'svelte-tasks-list.vercel.app',
    github: 'https://github.com/vaishnav-mk/tasks-list',
    stack: ['Svelte', 'SvelteKit', 'Tailwind'],
    icon: ['fas', 'list-check'],
  },
  {
    title: 'Hospital Management',
    description: 'My 12th grade project.',
    github: 'https://github.com/vaishnav-mk/CS-Project',
    stack: ['Python', 'MySQL'],
    icon: ['fas', 'hospital-user'],
  },
  {
    title: 'Barebones DJS Bot',
    description:
      'An extremely simple Discord Bot I made to explain how JS bots work on Discord.',
    stack: ['Javascript', 'DJS'],
    icon: ['fas', 'wrench'],
    github: 'https://github.com/vaishnav-mk/simple-djs-bot',
  },
  {
    title: 'Brainf*uck Interpreter',
    description:
      'An interpreter that interprets the brainf*ck programming language.',
    stack: ['Rust'],
    icon: ['fas', 'wand-magic-sparkles'],
  },
  {
    title: 'Kciw',
    description:
      'A Multi-purpose Discord Support Bot for a Bot Support Server.',
    stack: ['Javascript', 'Detritus', 'Rest APIs'],
    icon: ['fas', 'headset'],
  },
  {
    title: 'Astrea',
    description: 'A Simple Discord Bot that I made to practice C#.',
    stack: ['C#', 'Discatsharp'],
    icon: ['fas', 'pencil'],
  },
  {
    title: 'Calculator',
    description: 'A simple calculator made in C.',
    stack: ['C'],
    github: 'vaishnav-mk/calculator-in-c',
    icon: ['fas', 'calculator'],
  },
]
