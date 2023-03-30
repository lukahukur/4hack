import styles from '../styles/landing.module.scss'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsList } from 'react-icons/bs'
import { typedDispatch } from '@/store/store'
import { hideSideBar } from '@/store/slices/UI.slice'

export const routes = [
  {
    path: '/articles',
    name: '📙 List of articles',
  },
  {
    path: '/alltags',
    name: '🏷️All tags',
  },
  {
    path: '/about',
    name: '😻About',
  },
  {
    path: '/pp',
    name: '🤓Privacy Policy',
  },
]

const Header = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, isMounted] = useState(false)
  const dispatch = typedDispatch()

  const navList = routes.map((e, i) => (
    <li key={i}>
      <Link className="mr-2 " href={e.path}>
        {e.name}
      </Link>
    </li>
  ))

  useEffect(() => {
    isMounted(true)
  }, [])

  return (
    <header
      className="h-12 bg-white border-l border-r border-b dark:border-neutral-800 dark:bg-neutral-900 
      w-screen flex font-OpenSansBold
      text-2xl  fixed justify-center items-center z-20"
    >
      <span className={styles.header}>
        <button
          className="mr-2 sm:hidden"
          onClick={() => dispatch(hideSideBar(false))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            role="img"
            className="fill-neutral-300"
          >
            <title>Navigation menu</title>
            <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path>
          </svg>
        </button>
        <Link
          className="text-2xl 
          font-OpenSansBold text-transparent bg-clip-text 
          transition-all duration-500 bg-gradient-to-r from-blue-600 to-red-500 dark:from-pink-500 dark:to-blue-600 
          bg-size-200 bg-pos-100 hover:bg-pos-0 dark:bg-pos-0 hover:dark:bg-pos-100
          "
          href={'/'}
        >
          4Hack
        </Link>
        <span className="w-full flex font-OpenSansBold items-center px-4 sm:justify-between justify-end">
          <ul
            style={{ maxWidth: '530px' }}
            className="overflow-x-scroll sm:flex hidden justify-start sm:justify-between text-sm sm:text-base scrollbar-none  w-full pr-6"
          >
            {navList}
          </ul>
          {mounted && (
            <button
              className="text-xl w-14 flex rounded-full transition-all 
                         border dark:border-neutral-800 border-neutral-300
                         dark:bg-black bg-neutral-100
                         dark:pl-7 pl-0"
              onClick={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
            >
              {theme === 'light' ? '🌞' : '🌚'}
            </button>
          )}
        </span>
      </span>
    </header>
  )
}

export default Header
