import { Certificate } from 'data/certificates'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import { Circles } from 'components/circles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faFileCode } from '@fortawesome/free-solid-svg-icons'

interface CertificateCardProps {
  data: Certificate
}

export const CertificateCard = ({ data }: CertificateCardProps) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row p-6 outline outline-2 outline-lightText rounded-md select-none hover:bg-cardLight dark:md:hover:bg-cardDark transition duration-300 ease-in-out transform hover:scale-105 mb-10">
        <div className="absolute -top-7 left-6 btn rounded-md dark:btn bg-butDark text-white dark:text-lightText">
          {data.organization}
        </div>
        <div className="alert shadow-lg rounded-md bg-butLight text-white dark:text-lightText dark:alert dark:rounded-md">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6 text-[#36D399]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <span className="text-2xl">{data.title}</span>
            </div>
          </div>
          <a href={data.link} target="_blank" rel="noreferrer">
            <button className="btn rounded-md dark:btn bg-butDark gap-2 text-white dark:text-lightText">
              <FontAwesomeIcon icon={faLink} />
              LINK
            </button>
          </a>
        </div>
      </div>
    </>
  )
}
