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
    title: 'Image Classification',
    description: 'This is a trained CNN to classify images of bikes and cars, built for GDSC recruitments',
    github: 'https://github.com/vaishnav-mk/image-classification',
    stack: ['Keras', 'FastAPI', 'sveltekit'],
    icon: ['fas', 'brain']
  },
  {
    title: 'Grabbit',
    description: 'A microservice based image generator with gRPC and rabbitMQ',
    github: 'https://github.com/vaishnav-mk/grabbit',
    stack: ['gRPC', 'RabbitMQ', 'Svelte', 'Pillow'],
    icon: ['fas', 'server']
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
    github: 'vaishnav-mk/brainf-ck-interpreter',
  },
  {
    title: 'Goldfish Detector',
    description:
      'A simple python script that detects goldfish in images using OpenCV.',
    stack: ['Python', 'OpenCV'],
    icon: ['fas', 'fish'],
    github: 'vaishnav-mk/goldfish-detector',
  },
  {
    title: 'Solid Password Generator',
    description:
      'A simple password generator with API routes and dynamic documentation made in solid-start.',
    stack: ['SolidJS', 'Solid-Start'],
    icon: ['fas', 'key'],
    github: 'vaishnav-mk/password-generator',
  },
  {
    title: 'Python Connectivity Checker',
    description:
      'A simple python script that checks if a website is up or down.',
    stack: ['Python'],
    icon: ['fas', 'wifi'],
    github: 'vaishnav-mk/connectivity-checker',
  },
]
