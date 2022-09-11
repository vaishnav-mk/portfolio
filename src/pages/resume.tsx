import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import { resume } from 'data/resume'
import Link from 'next/link'
const Resume = () => {
  const { english } = resume
  return (
    <>
      <GenericMeta title="Resume" description="Vaishnav's Resume!" />
      <div id="app" className="z-50">
        <div className="min-w-screen min-h-screen left-0 absolute z-60">
          <div className="grid justify-items-center">
            <div className="w-full xl:w-304 flex flex-col lg:flex-row">
              <div className="bg-blue-400 flex-auto flex flex-col lg:w-3/12 lg:min-h-screen pt-10 pb-5 px-5">
                <div className="flex-auto text-center">
                  <img
                    src="/static/profile.gif"
                    alt="gif"
                    className="w-48 rounded-full mx-auto mb-5"
                  ></img>
                  <h1 className="text-4xl font-bold mb-3">{english.name}</h1>
                  <div>{english.description}</div>
                  <div className="flex flex-wrap mt-10 mb-20 justify-center">
                    {english.info.map((item) => (
                      <a
                        href={item.url}
                        className="px-2 py-1 hover:bg-blue-300 rounded-md transition-all transition-75 flex items-center mr-3 mb-2"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="envelope"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="text-lg mr-2 svg-inline--fa fa-envelope fa-w-16"
                        >
                          <path
                            fill="currentColor"
                            d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                            className=""
                          ></path>
                        </svg>
                        <div>{item.title}</div>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex-initial text-lg ml-5">
                  <div className="mb-10">
                    <h3 className="text-2xl mb-3">Languages</h3>

                    <div className="mr-10 mb-2 px-1 group">
                      <div className="flex items-center">
                        <div className="flex-auto font-bold">English</div>
                        <div className="flex-initial flex items-center group relative cursor-pointer">
                          <div className="w-3 h-3 bg-gray-800 rounded-sm mx-1"></div>
                          <div className="w-3 h-3 bg-gray-800 rounded-sm mx-1"></div>
                          <div className="w-3 h-3 bg-gray-800 rounded-sm mx-1"></div>
                          <div className="w-3 h-3 bg-blue-300 rounded-sm mx-1"></div>
                          <div className="w-3 h-3 bg-blue-300 rounded-sm mx-1"></div>
                          <div className="absolute text-sm hidden group-hover:block left-28 bg-gray-300 px-2 py-2 rounded-md">
                            {' '}
                            Intermediate{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mr-10 px-1 group">
                      <div className="flex items-center">
                        <div className="flex-auto font-bold">Spanish</div>
                        <div className="flex-initial flex items-center group relative cursor-pointer">
                          <div className="w-3 h-3 bg-gray-800 rounded-sm mx-1"></div>
                          <div className="w-3 h-3 bg-blue-300 rounded-sm mx-1"></div>
                          <div className="w-3 h-3 bg-blue-300 rounded-sm mx-1"></div>
                          <div className="w-3 h-3 bg-blue-300 rounded-sm mx-1"></div>
                          <div className="w-3 h-3 bg-blue-300 rounded-sm mx-1"></div>
                          <div className="absolute text-sm hidden group-hover:block left-28 bg-gray-300 px-2 py-2 rounded-md">
                            {' '}
                            Beginner{' '}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-10">
                    <h3 className="text-2xl mb-3">Technical Skills</h3>
                    <div className="flex flex-wrap items-center text-sm font-bold px-1">
                      <div className="flex-initial flex items-center group relative cursor-pointer">
                        <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                          Python
                        </div>
                        <div className="absolute text-sm hidden group-hover:block top-10 bg-gray-300 px-2 py-2 rounded-md">
                          {' '}
                          Beginner{' '}
                        </div>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        JavaScript
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        TypeScript
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        Rust
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        Golang
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        HTML5
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        CSS3
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        SCSS &amp; SASS
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        VueJS
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        NuxtJS
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        React
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        NextJS
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        Linux
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        Git
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        MongoDB
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        PostgreSQL
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        Redis
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        REST APIs
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        Docker
                      </div>
                      <div className="px-2 py-1 rounded-md bg-blue-300 mr-2 mb-2">
                        Kubernetes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-auto lg:w-8/12 pt-10 px-5 lg:pl-16 text-lg">
                <div className="overflow-x-hidden w-full">
                  <div className="flex grid gap-4 grid-cols-3 grid-rows-3">
                    <h2>balls</h2>
                    {english.info.map((item) => (
                      <a
                        href={item.url}
                        className="px-2 py-1 hover:bg-blue-300 rounded-md transition-all transition-75 flex items-center mr-3 mb-2"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="envelope"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="text-lg mr-2 svg-inline--fa fa-envelope fa-w-16"
                        >
                          <path
                            fill="currentColor"
                            d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                            className=""
                          ></path>
                        </svg>
                        <div>{item.title}</div>
                      </a>
                    ))}
                  </div>
                  <h2 className="landingSectionTitle max-w-max mx-0 text-3xl relative mb-4 md:w-max ">
                    Work Experience
                  </h2>

                  <div>
                    <div className="font-bold flex flex-col sm:flex-row sm:items-center mb-3">
                      <div className="text-xl mr-2">Independent Business</div>
                      <div className="px-2 py-1 bg-gray-200 rounded-md text-sm text-center mt-1 sm:mt-0">
                        {' '}
                        2018 - Present{' '}
                      </div>
                    </div>
                    <div className="ml-3">
                      <ul className="list-inside list-disc">
                        <li>
                          Taught myself web development and system
                          administration
                        </li>
                        <li>Created and maintained multiple projects</li>
                        <li>Built a small business</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-3xl mb-4">Education</h3>
                  <div>
                    <div className="font-bold flex flex-col sm:flex-row sm:items-center mb-3">
                      <div className="text-xl mr-2">
                        Schulzentrum SII Utbremen
                      </div>
                      <div className="px-2 py-1 bg-gray-200 rounded-md text-sm text-center mt-1 sm:mt-0">
                        {' '}
                        2017 - July 2021{' '}
                      </div>
                    </div>
                    <div className="mb-3 ml-3">
                      <div>
                        <span className="font-bold">Abitur</span>
                        <span className="text-gray-500">
                          {' '}
                          (Comparable to AP exams)
                        </span>
                      </div>
                      <div className="text-gray-700">
                        Focused on informational technology and mathematics
                      </div>
                    </div>
                    <div className="ml-3">
                      <div>
                        <span className="font-bold">Apprenticeship</span>
                        <span className="text-gray-500">
                          {' '}
                          (Comparable to an associate degree)
                        </span>
                      </div>
                      <div className="text-gray-700">
                        {' '}
                        Focused on informational technology and computer science{' '}
                        <ul className="list-inside list-disc ml-1 mt-1">
                          <li>Basic computer components and logic gates</li>
                          <li>Networking</li>
                          <li>CCNA Routing and Switching (1-4)</li>
                          <li>Software Development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-3xl mb-4">Projects</h3>
                  <div className="mb-8">
                    <div className="font-bold flex items-center mb-3">
                      <div className="text-xl mr-2">Xenon Bot</div>
                      <a href="https://xenon.bot" target="_blank">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="globe"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                          className="text-lg text-blue-500 hover:text-blue-600 mr-2 svg-inline--fa fa-globe fa-w-16"
                        >
                          <path
                            fill="currentColor"
                            d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
                            className=""
                          ></path>
                        </svg>
                      </a>
                      <a href="https://github.com/Xenon-Bot" target="_blank">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="github"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                          className="text-lg text-blue-500 hover:text-blue-600 mr-2 svg-inline--fa fa-github fa-w-16"
                        >
                          <path
                            fill="currentColor"
                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                            className=""
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div className="ml-3">
                      {' '}
                      One of the biggest discord bots in the world with over one
                      million users{' '}
                      <div className="flex flex-wrap mt-2 text-sm font-bold">
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          Python
                        </div>
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          Rust
                        </div>
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          gRPC
                        </div>
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          NextJS
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="font-bold flex items-center mb-3">
                      <div className="text-xl mr-2">Discord Templates</div>
                      <a href="https://templates.xenon.bot" target="_blank">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="globe"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                          className="text-lg text-blue-500 hover:text-blue-600 mr-2 svg-inline--fa fa-globe fa-w-16"
                        >
                          <path
                            fill="currentColor"
                            d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
                            className=""
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div className="ml-3">
                      {' '}
                      One of the biggest community driven collection of discord
                      server templates{' '}
                      <div className="flex flex-wrap mt-2 text-sm font-bold">
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          Python
                        </div>
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          JavaScript
                        </div>
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          Tailwind
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="font-bold flex items-center mb-3">
                      <div className="text-xl mr-2">Kite Bot</div>
                      <a href="https://kite.bot" target="_blank">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="globe"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                          className="text-lg text-blue-500 hover:text-blue-600 mr-2 svg-inline--fa fa-globe fa-w-16"
                        >
                          <path
                            fill="currentColor"
                            d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
                            className=""
                          ></path>
                        </svg>
                      </a>
                      <a href="https://github.com/dc-kitebot" target="_blank">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="github"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                          className="text-lg text-blue-500 hover:text-blue-600 mr-2 svg-inline--fa fa-github fa-w-16"
                        >
                          <path
                            fill="currentColor"
                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                            className=""
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div className="ml-3">
                      {' '}
                      A no-code platform for discord bots that allows its users
                      to create their own bots{' '}
                      <div className="flex flex-wrap mt-2 text-sm font-bold">
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          VueJS
                        </div>
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          Tailwind
                        </div>
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          TypeScript
                        </div>
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          Rust
                        </div>
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          ExpressJS
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-16">
                    <div className="font-bold flex items-center mb-3">
                      <div className="text-xl mr-2">discord.club</div>
                      <a href="https://discord.club" target="_blank">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="globe"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                          className="text-lg text-blue-500 hover:text-blue-600 mr-2 svg-inline--fa fa-globe fa-w-16"
                        >
                          <path
                            fill="currentColor"
                            d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
                            className=""
                          ></path>
                        </svg>
                      </a>
                      <a
                        href="https://github.com/Xenon-Bot/discord.club"
                        target="_blank"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="github"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                          className="text-lg text-blue-500 hover:text-blue-600 mr-2 svg-inline--fa fa-github fa-w-16"
                        >
                          <path
                            fill="currentColor"
                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                            className=""
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <div className="ml-3">
                      {' '}
                      A tool that allows thousands of users to create custom
                      messages for their discord server{' '}
                      <div className="flex flex-wrap mt-2 text-sm font-bold">
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          VueJS
                        </div>
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          Bootstrap
                        </div>
                        <div className="px-2 py-1 bg-gray-200 rounded-md mr-2">
                          Python
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-x-4 fixed bottom-5 right-5 flex">
            <select className="h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center justify-items-center text-justify hover:ring-2 ring-gray-300  transition-all">
              <option value="en">English</option>
              <option value="de">German</option>
            </select>
            <Link href="/">
              <button
                title="My Resume"
                className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="home"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="text-xl svg-inline--fa fa-home fa-w-18"
                >
                  <path
                    fill="currentColor"
                    d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
                    className=""
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Resume
