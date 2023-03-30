import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { postPreviewType, Topics } from '@/types/types'
import Main from '@/comonents/main/main/main'
import SideBar from '@/comonents/main/main/sidebar'
import { useTheme } from 'next-themes'
import Navbar, { routes } from '@/comonents/main/main/Header'
import styles from '../comonents/main/styles/landing.module.scss'
import { MobileSideBar } from '@/comonents/main/main/mobileSideBar'
const Home: NextPage<{
  posts: postPreviewType[]
  topics: Topics[]
}> = ({ posts, topics }) => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <Head>
        <title>4Hack</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Navbar />
      <main className="flex justify-end lg:pr-0 lg:justify-center pt-5">
        <span className={styles.main_wrapper}>
          <SideBar topics={topics} />
          <MobileSideBar routes={routes} />
          <span className="pt-9 ">
            <Main posts={posts} topics={topics} />
          </span>
        </span>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let resp = await Promise.all([
    fetch(
      process.env.NEXT_PUBLIC_BURL + '/api/posts/getMany0/10'
    ).then((e) => e.json()),
    fetch(process.env.NEXT_PUBLIC_BURL + '/api/topics').then((e) =>
      e.json()
    ),
  ])

  if (!resp[0][0])
    return {
      notFound: true,
    }

  return {
    props: {
      posts: resp[0],
      topics: resp[1],
    },
    revalidate: 69,
  }
}
export default Home
