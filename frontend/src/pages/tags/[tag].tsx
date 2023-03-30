import Main from '@/comonents/main/main/main'
import Navbar from '@/comonents/main/main/Header'
import SideBar from '@/comonents/main/main/sidebar'
import { useGetManyWithTagMutation } from '@/store/API/api.posts'
import { postPreviewType, Topics } from '@/types/types'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import styles from '@/comonents/main/styles/landing.module.scss'

let lim = 10
let reachedLimit = false
const Tags: NextPage<{
  posts: postPreviewType[]
  topics: Topics[]
  tag: string
}> = ({ posts: __posts, topics, tag }) => {
  const [posts, setPosts] = useState<postPreviewType[]>([])
  const [getMorePosts] = useGetManyWithTagMutation()

  const handleScroll = () => {
    var nearBottom =
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100

    if (nearBottom && !reachedLimit) {
      getMorePosts({ offset: lim, limit: lim, tag: tag }).then(
        (e: any) => {
          if (e.data.length) {
            setPosts((arr) => [...arr, ...e.data])
          } else {
            reachedLimit = true
          }
        }
      )
      ++lim
    }
  }

  useEffect(() => {
    setPosts(__posts)
  }, [__posts])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderPosts = useMemo(
    () => <Main posts={posts} topics={topics} />,
    [posts]
  )

  return (
    <>
      <Head>
        <title>{`4Hack - ${tag}`}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>

      <Navbar />

      <main className="flex justify-center pt-5">
        <span className={styles.main_wrapper}>
          <SideBar topics={topics} />
          <span className="flex flex-col pt-14 font-OpenSansBold items-start">
            <span className="w-80 sm:w-600px">
              <h1 className="text-2xl ">Tag: {tag}</h1>
            </span>
            <span>{renderPosts}</span>
          </span>
        </span>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  let resp = await Promise.all([
    await fetch(
      process.env.NEXT_PUBLIC_BURL +
        `/api/posts/getWithTag/${params!.tag}/0/10`
    ).then((e) => e.json()),
    fetch(process.env.NEXT_PUBLIC_BURL + '/api/topics').then((e) =>
      e.json()
    ),
  ])

  if (!resp[1])
    return {
      notFound: true,
    }

  return {
    props: {
      posts: resp[0],
      topics: resp[1],
      tag: params!.tag,
    },
  }
}

export default Tags
