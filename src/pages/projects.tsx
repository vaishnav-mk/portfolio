import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import Projects from 'components/Projects/Projects'

const Project = () => {
  return (
    <>
      <GenericMeta
        title="Vaishnav | Projects"
        description="An overview of my projects!"
      />

      <MainLayout margin={false}>
        <Projects />
      </MainLayout>
    </>
  )
}

export default Project
