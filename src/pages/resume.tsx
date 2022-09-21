import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import resume from '/public/resume.webp'
import Image from 'next/image'
const Resume = () => {
  return (
    <>
      <GenericMeta title="Vaishnav | Resume" description="My resume!" />

      <MainLayout margin={false}>
        <Image src={resume} alt="Resume" />
      </MainLayout>
    </>
  )
}

export default Resume
