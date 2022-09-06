import { useEffect, useState } from 'react'
import { dayjs } from 'lib/dayjs'

const now = () => dayjs().tz()

const format = 'hhA'
const beforeTime = dayjs('12AM', format).tz()
const afterTime = dayjs('8AM', format).tz()

const Time = () => {
  const [date, setDate] = useState(now())
  useEffect(() => {
    const timer = setInterval(() => setDate(now()), 1000)
    return () => clearInterval(timer)
  }, [])
  return date.format('Do MMMM YYYY • h:mm:ss A')
}

export default Time
