import { Project } from 'data/projects'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
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
      className="flex flex-col sm:flex-row p-6 border border-lightText rounded-xl mb-4 duration-500 select-none hover:bg-cardLight dark:md:hover:bg-cardDark"
    >
      <div className="flex items-center justify-center text-4xl sm:w-2/12 mr-5 sm:mb-0 border aspect-square hover:bg-butLight dark:md:hover:bg-butDark duration-500 border-lightText rounded-xl">
        <div className="flex items-center justify-center text-4xl w-full sm:w-1/12 mb-4 sm:mb-0">
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
      <div className="flex flex-col items-center sm:items-start w-full sm:w-11/12">
        <div className="flex flex-wrap gap-y-3 my-2 gap-x-1">
          <h3>{title}</h3>
          {stack?.map((item, index) => (
            <h3 key={uuidv4()}>
              <span
                className="border border-lightText rounded-lg px-3 py-1 py-transition duration-500 select-none hover:bg-butLight dark:md:hover:bg-butDark"
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
              href={link}
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
              href={`https://github.com/${github}`}
              className="flex items-center py-1 px-3"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFileCode} />
              <span className="ml-2  text-lightText  transition-colors duration-500">
                {github}
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
