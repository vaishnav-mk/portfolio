import { ReactNode } from 'react'
import FadeIn from 'react-fade-in'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface Props {
  children: ReactNode
  description: string
  title: string
  iconDesc?: IconProp
  iconTitle?: IconProp
}

export const SubLayout = ({
  children,
  description,
  title,
  iconTitle,
  iconDesc,
}: Props) => {
  return (
    <>
      <FadeIn>
        <div>
          <div className="overflow-hidden">
            <h2 className="landingSectionTitle text-left relative mb-4 md:w-max gap-2 btn btn-ghost btn-disabled dark:text-white text-lightText">
              {iconTitle ? <FontAwesomeIcon icon={iconTitle} /> : ''}
              {title}
            </h2>
          </div>
        </div>
        <div className="text-lg">
          {description} {iconDesc ? <FontAwesomeIcon icon={iconDesc} /> : ''}
        </div>
        {children}
      </FadeIn>
    </>
  )
}
