import { Topics } from '@/types/types'
import { NextPage } from 'next'
import Link from 'next/link'
import { routes } from './Header'

const SideBar: NextPage<{ topics: Topics[] }> = ({ topics }) => {
  return (
    <nav
      className="hidden w-64 mr-4 min-w-fit flex-col text-lg h-screen
                    lg:left-0 2xl:left-52 md:flex z-1
                    pt-12 overflow-scroll scrollbar-none"
    >
      {routes.map((e, i) => {
        return (
          <Link
            key={i}
            href={e.path}
            className="px-3 flex items-center h-8   hover:dark:bg-neutral-800 hover:bg-zinc-200 rounded-md"
          >
            {e.name}
          </Link>
        )
      })}
      <span className="text-zinc-400 font-OpenSansBold px-3 ">
        Tags:
      </span>
      <ul className="flex flex-col ">
        {topics
          .sort((a, b) => b.count - a.count)
          .map((e, i) => {
            return (
              <li
                className="text-base  h-8 font-OpenSans hover:bg-zinc-200 hover:dark:bg-neutral-800 
                           px-6 justify-between flex items-center transition-all duration-100  rounded-md"
                key={i}
              >
                <Link href={'/tags/' + e.name} className="w-full">
                  <span className="flex justify-between w-full">
                    <span>{e.name}</span>
                    <span>{e.count}</span>
                  </span>
                </Link>
              </li>
            )
          })}
      </ul>
    </nav>
  )
}

export default SideBar
