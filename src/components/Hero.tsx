import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faCloud,
  faCalendarDay,
} from '@fortawesome/free-solid-svg-icons'
import { Weather } from 'components/Weather'
const Time = dynamic(() => import('components/Time'), {
  ssr: false,
})
import Link from 'next/link'
export default function Hero() {
  const temp = Weather()
  console.log(temp)
  return (
    <div className="mb-20">
      <h1 className="mt-5 mb-4">Hey there! I'm Vaishnav</h1>
      <p className="text-lg">
        <FontAwesomeIcon icon={faCloud} /> Constantly pushing the boundaries of
        what I know to create weird and wonderful projects.
      </p>
      <p className="text-lg">
        <FontAwesomeIcon icon={faClock} /> <Time />
      </p>
      <p>
        <Weather />
      </p>
      <p>
        <FontAwesomeIcon icon={faCloud} /> Currently listening to: Nothing!
      </p>
      <p>
        <FontAwesomeIcon icon={faCalendarDay} /> 18 Years old
      </p>
    </div>
  )
}
