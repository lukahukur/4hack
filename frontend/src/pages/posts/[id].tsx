import { IPost } from '@/store/API/api.posts'
import { sanitize } from 'dompurify'
import { marked } from 'marked'
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
} from 'next'
import h from 'highlight.js'
import { FC, useEffect, useRef, useState } from 'react'
import styles from '../../comonents/AdminPanel/styles/editor.module.scss'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'
import Head from 'next/head'
import Navbar, { routes } from '@/comonents/main/main/Header'
import { postPreviewType } from '@/types/types'
import { MobileSideBar } from '@/comonents/main/main/mobileSideBar'

const renderer = new marked.Renderer()

renderer.html = (html) => {
  return sanitize(html, { USE_PROFILES: { html: true, svg: true } })
}

renderer.text = (text) => {
  return sanitize(text)
}

const Post: FC<{ post: IPost }> = ({ post }) => {
  const display = useRef<HTMLInputElement>(null)
  const [mounted, setM] = useState(false)

  useEffect(() => {
    if (post) {
      setTimeout(() => {
        h.highlightAll()
      })
      display.current!.innerHTML = marked(post.body, { renderer })
      setM(true)
    }
  }, [post])

  if (!post) return <></>

  return (
    <>
      <Head>
        <title>{post.header}</title>
        <meta name="description" content={post.metatags} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <span className="lg:hidden">
        <Navbar />
      </span>
      {/* <span
        dangerouslySetInnerHTML={{
          __html: mounted
            ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8836168772174750"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8836168772174750"
     data-ad-slot="7154865431"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`
            : '',
        }}
      ></span> */}
      <>
        <Navbar />
        <MobileSideBar routes={routes} />
        <main className="flex justify-center pt-16 w-screen xs:w-full">
          <span
            className="bg-white w-full max-w-fit border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800
               flex flex-col justify-center items-center rounded-md md:py-5 md:p-5"
          >
            <article
              className={styles.md_text_display}
              ref={display}
            />
          </span>
        </main>
      </>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let res = await fetch(
    process.env.NEXT_PUBLIC_BURL + `/api/posts/${params!.id}`
  ).then((e) => e.json())

  if (!res)
    return {
      notFound: true,
    }

  return {
    props: {
      post: res,
    },
    revalidate: 69,
  }
}
export const getStaticPaths: GetStaticPaths<{
  id: string
}> = async () => {
  let posts: postPreviewType[] = await fetch(
    process.env.NEXT_PUBLIC_BURL + '/api/posts/getMany0/10000'
  ).then((e) => e.json())

  let paths: any = posts.map((e) => ({
    params: {
      id: e.id.toString(),
    },
  }))
  return {
    paths: paths,
    fallback: true,
  }
}
export default Post
