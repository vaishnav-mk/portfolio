import { MainLayout } from 'layouts/MainLayout'
import { GenericMeta } from 'components/DefaultMeta'
import { v4 as uuidv4 } from 'uuid'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { Account, AccountData } from 'data/accounts'
import Projects from 'components/Projects/Projects'
import Hero from 'components/Hero'
import Stack from 'components/Stack'

const Home = () => {
  const { theme } = useTheme()

  const copyEmail = () => {
    navigator.clipboard.writeText('v@ven.earth')
    theme === 'dark'
      ? toast.success('Copied email to clipboard!', {
          style: {
            background: '#333',
            color: '#fff',
          },
        })
      : toast.success('Copied email to clipboard!')
  }

  return (
    <>
      <GenericMeta
        title="Vaishnav"
        description="An up and coming developer who loves to code and create things."
      />

      <MainLayout margin={false}>
        <Hero />
        <Projects />
        <Stack />
        <Projects />
      </MainLayout>
    </>
  )
}

export default Home
