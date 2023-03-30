import { useGetPostsV2Mutation } from '@/store/API/api.posts'
import { postPreviewType, Topics } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import styles from '../styles/landing.module.scss'

let monthArray = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const Main: FC<{ posts: postPreviewType[]; topics: Topics[] }> = ({
  posts,
  topics,
}) => {
  return (
    <div className="flex flex-col min-h-screen xl:ml-0 md:ml-0 mt-5 font-OpenSansBold ">
      <span>
        {posts
          .sort((a, b) => +b.c_date - +a.c_date)
          .map((e, i) => {
            return <Card key={i} post={e} />
          })}
      </span>
    </div>
  )
}

export default Main

const Card: FC<{ post: postPreviewType }> = ({ post }) => {
  let date = new Date(+post.c_date)
  let dateString =
    date.getFullYear() +
    ' ' +
    monthArray[date.getMonth()] +
    ' ' +
    date.getDate()

  return (
    <article
      className="flex bg-white flex-col font-OpenSans border
     border-gray-300 rounded-xl overflow-hidden mb-2 h-112
    w-full 
     md:w-600px md:h-500px
     dark:bg-neutral-900
     dark:border-neutral-800
     "
    >
      <span className="overflow-hidden">
        <img src={post.image} alt={post.header} />
      </span>
      <span className="px-4 pl-8 h-1/2 py-3 flex flex-col justify-between">
        <span>
          <time className="text-neutral-900 dark:text-neutral-500">
            {dateString}
          </time>
          <Link href={'/posts/' + post.id}>
            <h2 className="text-3xl font-OpenSansBold">
              {post.header}
            </h2>
          </Link>
        </span>
        <Link
          className="dark:text-zinc-500 hover:border hover:dark:border-neutral-600 
            hover:bg-neutral-300 hover:border-neutral-100 hover:dark:bg-neutral-800 max-w-fit p-1 hover:rounded-md"
          href={`/tags/${post.topic}`}
        >
          #{post.topic.toString()}
        </Link>
        <p className="dark:text-neutral-500">
          Author - {post.author}
        </p>
      </span>
    </article>
  )
}
