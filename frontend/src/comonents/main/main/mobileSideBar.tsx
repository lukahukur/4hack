import { typedDispatch, typedUseSelector } from '@/store/store'
import Link from 'next/link'
import { FC } from 'react'
import { hideSideBar } from '@/store/slices/UI.slice'
export const MobileSideBar: FC<{
  routes: Array<{ path: string; name: string }>
}> = ({ routes }) => {
  const dispatch = typedDispatch()
  const hide = typedUseSelector((e) => e.UIslice.hideSidebar)

  const sidebarState = () => {
    if (hide) {
      return `sm:-left-80 fixed z-50 w-72 -left-80 -top-0 transition-all 
      dark:bg-neutral-900 bg-neutral-100 h-screen py-3 px-3`
    }
    return `sm:-left-80 fixed z-50 w-72 left-0 -top-0 transition-all 
            dark:bg-neutral-900 bg-neutral-100 h-screen py-3 px-3`
  }

  return (
    <span className={sidebarState()}>
      <span className="w-full flex justify-between items-center dark:fill-neutral-100 font-OpenSans mb-4">
        <Link href={'/'}>
          <button onClick={() => dispatch(hideSideBar(true))}>
            <h2 className="font-OpenSansBold">4hack 👨‍💻</h2>
          </button>
        </Link>
        <button onClick={() => dispatch(hideSideBar(true))}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
          >
            <title>Close</title>
            <path
              d="M12 10.586l4.95-4.95 1.414 
        1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95
         4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z"
            ></path>
          </svg>
        </button>
      </span>
      <SideBar routes={routes} />
    </span>
  )
}

const SideBar: FC<{
  routes: Array<{ path: string; name: string }>
}> = ({ routes }) => {
  const dispatch = typedDispatch()
  return (
    <aside className="font-OpenSansBold text-lg h-40">
      <nav className="flex flex-col h-full">
        <ul className="flex flex-col h-full justify-between pl-1 ">
          {routes.map((e, i) => {
            return (
              <li
                onClick={() => dispatch(hideSideBar(true))}
                key={i}
                className="hover:dark:bg-neutral-700 hover:bg-neutral-300
                              px-1 rounded-md h-10 flex items-center"
              >
                <Link href={e.path}>{e.name}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
