import { SubLayout } from 'layouts/SubLayout'
import { GenericMeta } from 'components/DefaultMeta'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faFileCode } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { ProjectData } from 'data/projects'
import { ProjectCard } from './ProjectCard'

const Projects = () => {
  return (
    <SubLayout
      title="Projects"
      description="A list of all the projects I've worked on or I'm currently working on."
      iconTitle={['far', 'folder-open']}
    >
      <div className="mb-8"></div>
      <div className="grid">
        {ProjectData.map((project) => (
          <ProjectCard
            key={uuidv4()}
            title={project.title}
            description={project.description}
            icon={project.icon}
            link={project.link}
            github={project.github}
            stack={project.stack}
          />
        ))}
      </div>
    </SubLayout>
  )
}

export default Projects
