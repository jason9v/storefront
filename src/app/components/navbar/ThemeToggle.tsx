'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <Image
        src="/icons/navbar/sun.svg"
        width={20}
        height={20}
        alt="Theme toggle"
        className="dark:invert"
        priority
      />
    </button>
  )
}

export default ThemeToggle
