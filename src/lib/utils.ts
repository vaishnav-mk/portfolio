import { useEffect, useState } from 'react'
export const truncate = (str: string, n: number) => {
  return str.length > n ? str.slice(0, n) + '...' : str
}
export const useMarquee = (str: any, n: number, trunc: boolean = false) => {
  const [displayString, setDisplayString] = useState('')
  let start = 0

  useEffect(() => {
    if (trunc) {
      return setDisplayString(str.length > n ? str.slice(0, n) + '...' : str)
    }
    const interval = setInterval(() => {
      let substring = str.substring(start, start + n)
      if (substring.length < n) {
        substring += str.substring(0, n - substring.length)
      }
      if (substring[substring.length - 1] === ' ') {
        substring = substring.substring(0, substring.length - 1) + '.'
      }
      setDisplayString(substring)
      start = start + 1 === str.length ? 0 : start + 1
    }, 200)

    return () => clearInterval(interval)
  }, [str, n, trunc])

  return displayString
}
