import { Project } from 'data/projects'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import { Circles } from 'components/circles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faFileCode } from '@fortawesome/free-solid-svg-icons'

export const ProjectCard = ({
  title,
  description,
  link,
  icon = ['fab', 'github'],
  github,
  stack,
}: Project) => {
  return (
    <div
      key={uuidv4()}
      className="flex flex-col sm:flex-row p-6 outline outline-2 outline-lightText rounded-md mb-4 select-none hover:bg-cardLight dark:md:hover:bg-cardDark transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="flex justify-center text-4xl sm:w-2/12 sm:mr-5 sm:mb-0 hover:bg-butLight dark:md:hover:bg-butDark duration-500 rounded-md">
        <div className="flex items-center justify-center text-4xl sm:w-1/12 m-4">
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
      <div className="flex flex-col items-center sm:items-start w-full sm:w-11/12">
        <div className="flex flex-wrap gap-y-3 my-2 gap-1">
          <h3>{title}</h3>
          {stack?.map((item, index) => (
            <h3 key={uuidv4()}>
              <span
                className="outline-lightText outline outline-1 rounded-md px-3 py-1 py-transition duration-500 select-none hover:bg-butLight dark:md:hover:bg-butDark"
                key={uuidv4()}
              >
                {item}
              </span>
            </h3>
          ))}
        </div>
        <p>{description}</p>

        <div className="flex items-center flex-wrap -m-3 pt-5">
          {link && (
            <a
              href={`https://${link}`}
              className="flex items-center  py-1 px-3"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLink} />
              <span className="ml-2  text-lightText transition-colors duration-500">
                {link}
              </span>
            </a>
          )}
          {github && (
            <a
              href={github}
              className="flex items-center py-1 px-3"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={['fab', 'github']} />
              <span className="ml-2  text-lightText  transition-colors duration-500">
                {github.split('/')?.at(-1)}
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
