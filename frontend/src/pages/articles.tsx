import Navbar, { routes } from '@/comonents/main/main/Header'
import { MobileSideBar } from '@/comonents/main/main/mobileSideBar'
import { postPreviewType } from '@/types/types'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Articles: NextPage<{
  posts: postPreviewType[]
}> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>list of articles</title>
      </Head>
      <Navbar />
      <MobileSideBar routes={routes} />
      <div className="w-full min-h-screen flex justify-center dark:bg-black bg-neutral-100 font-OpenSans">
        <main
          style={{ maxWidth: '1000px' }}
          className="mt-14 flex flex-col w-full h-min
        bg-white border-neutral-200 border py-3 px-5
        dark:bg-neutral-900 dark:border-neutral-800 rounded-lg
        "
        >
          <h1 className="dark:text-purple-500 text-black font-OpenSansBold">
            Articles
          </h1>
          <br />
          <ul>
            {posts.map((e, i) => {
              return (
                <li key={i} className="my-3 flex ">
                  <Link href={'/posts/' + e.id}>
                    <h2 className="text-xl font-OpenSansBold text-blue-500 underline">
                      {e.header}
                    </h2>
                  </Link>
                </li>
              )
            })}
          </ul>
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let resp = await fetch(
    process.env.NEXT_PUBLIC_BURL + '/api/posts/getMany0/1000'
  ).then((e) => e.json())

  if (!resp)
    return {
      notFound: true,
    }

  return {
    props: {
      posts: resp,
    },
    revalidate: 69,
  }
}

export default Articles
