import Head from 'next/head'
import Main from './body/main'
import HeadPanel from './body/headPanel'

export const AdminPanel = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>

      <span className="flex flex-col  bg-dark font-OpenSans">
        <span className="text-white rouned-md h-fit bg-dark">
          <HeadPanel />
          <Main />
        </span>
      </span>
    </>
  )
}
