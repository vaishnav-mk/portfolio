import { ReactNode } from 'react'
import { GenericMeta } from '../components/DefaultMeta'
import FadeIn from 'react-fade-in'
import Footer from 'components/Footer'

interface Props {
  children: ReactNode
  title?: string
  description?: string
  margin?: boolean
}

export const MainLayout = ({
  children,
  title,
  description,
  margin = true,
}: Props) => {
  return (
    <>
      {title && description && (
        <GenericMeta title={title} description={description} />
      )}

      <FadeIn className="overflow-hidden">
        {description && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
        )}
        <div className={margin ? 'mt-8' : undefined}>{children}</div>
          <Footer />
      </FadeIn>
    </>
  )
}
