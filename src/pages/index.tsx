import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import Hero from 'components/Hero'

const Home = () => {
  return (
    <>
      <GenericMeta
        title="Vaishnav"
        description="An up and coming developer who loves to code and create things."
      />
      <MainLayout margin={false}>
        <Hero />
        <h2 className="btn btn-ghost landingSectionTitle max-w-max mx-0 text-left relative mb-4 md:w-max">
          Info
        </h2>
        <Hero />
      </MainLayout>
    </>
  )
}

export default Home
