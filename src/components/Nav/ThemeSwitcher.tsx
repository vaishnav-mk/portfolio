import useSound from 'use-sound'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  //const [playOn] = useSound('/sound/switch-on.mp3')
  //const [playOff] = useSound('/sound/switch-off.mp3')

  const toggle = () => {
    if (theme === 'dark') {
      setTheme('light')
      //playOn()
    } else {
      setTheme('dark')
      //playOff()
    }
  }

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
      onClick={() => toggle()}
    >
      <FontAwesomeIcon
        className="h-4 w-4 text-gray-800 dark:text-gray-200"
        icon={theme === 'light' ? ['far', 'moon'] : ['fad', 'sun']}
      />
    </button>
  )
}
