import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import resume from '/public/resume.webp'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Resume = () => {
  return (
    <>
      <GenericMeta title="Vaishnav | Resume" description="My resume!" />

      <MainLayout margin={false}>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Image src={resume} alt="Resume" className="rounded-md"/>
        </div>
        <div className="fixed bottom-5 right-5 flex">
          <a
            href="/view-resume"
            className="btn btn-success btn-outline btn-xs gap-2 animate-bounce"
            target="_blank"
          >
            <FontAwesomeIcon icon={['fas', 'up-right-from-square']} /> Resume
            PDF
          </a>
        </div>
      </MainLayout>
    </>
  )
}

export default Resume
