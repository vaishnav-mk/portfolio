import { ReactNode } from 'react'
import FadeIn from 'react-fade-in'

interface Props {
  children: ReactNode
  description: string
  title: string
}

export const SubLayout = ({ children, description, title }: Props) => {
  return (
    <>
      <FadeIn>
        <div>
          <div className="overflow-hidden">
            <h2 className="landingSectionTitle text-left relative mb-4 md:w-max">
              {title}
            </h2>
          </div>
        </div>
        <p className="text-lg">{description}</p>
        {children}
      </FadeIn>
    </>
  )
}
