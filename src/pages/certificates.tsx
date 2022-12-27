import { GenericMeta } from 'components/DefaultMeta'
import { MainLayout } from 'layouts/MainLayout'
import { SubLayout } from 'layouts/SubLayout'
import Certificates from 'components/Certificates/Certificates'
const Achievements = () => {
  return (
    <>
      <GenericMeta
        title="Vaishnav | Certificates"
        description="An overview of my certificates!"
      />
      <MainLayout margin={false}>
        <Certificates />
      </MainLayout>
    </>
  )
}

export default Achievements
