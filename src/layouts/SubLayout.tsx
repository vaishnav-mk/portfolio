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
      <FadeIn className="overflow-hidden">
        <div className="overflow-x-hidden w-full mt-8">
          <h2 className="btn btn-ghost landingSectionTitle max-w-max mx-0 text-left relative mb-4 md:w-max ">
            {title}
          </h2>
        </div>
        <p className="text-lg">{description}</p>
        {children}
      </FadeIn>
    </>
  )
}
