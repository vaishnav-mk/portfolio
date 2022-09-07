import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import Stack from 'components/Stack'

const Skills = () => {
  return (
    <>
      <GenericMeta title="Vaishnav | Skills" description="My Stack" />

      <MainLayout margin={false}>
        <Stack />
      </MainLayout>
    </>
  )
}

export default Skills
