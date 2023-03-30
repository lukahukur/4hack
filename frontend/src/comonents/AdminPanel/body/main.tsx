import {
  useDeletePostMutation,
  useGetPostsQuery,
} from '@/store/API/api.posts'
import {
  useAddTopicMutation,
  useDeleteTopicMutation,
  useGetTopicsQuery,
} from '@/store/API/api.topics'
import { setTargetArticle } from '@/store/slices/edit.slice'
import { setAppState } from '@/store/slices/global'
import { typedDispatch, typedUseSelector } from '@/store/store'
import { FC, useEffect, useRef, useState } from 'react'
import styles from '../styles/editor.module.scss'
import CreateAPost from '../create/createarticle'
import { EditAnArticle } from '../edit/edit.article'
import ValidateForm from '../validator'

export default function Main() {
  return (
    <span className="flex">
      <SideBar />
      <Map />
      <CreateAPost />
      <EditAnArticle />
    </span>
  )
}

const Map = (): any => {
  const { data, isSuccess } = useGetPostsQuery({
    offset: 0,
    limit: 100,
  })
  const dispatch = typedDispatch()
  const appState = typedUseSelector((s) => s.appState.appState)
  const render: boolean = appState === 'none'
  const [del, setArticleUserWantsToDelete] = useState<null | string>()
  const [naxui, { error, isSuccess: sucksAss }] =
    useDeletePostMutation()

  return (
    <ul className={render ? 'w-full' : 'hidden'}>
      <span className=" flex flex-col min-h-screen ">
        {isSuccess &&
          data.map((e, i) => (
            <li key={i} className={styles.mapPosts}>
              <span className="w-96">{e.header}</span>{' '}
              <button
                className={
                  del === e.id ? 'hidden' : 'block text-purple-500'
                }
              >
                {e.topic}
              </button>
              <button
                className={del === e.id ? 'hidden' : 'block'}
                onClick={() => {
                  dispatch(setTargetArticle(e.id))
                  dispatch(setAppState('editing'))
                }}
              >
                Edit
              </button>
              <span className="flex items-center justify-center flex-col ">
                {del === e.id && (
                  <>
                    <span className="flex relative bottom-1 w-32">
                      Are you sure?
                    </span>
                    <span className="flex items-center justify-between w-full">
                      <button
                        className="text-red-800"
                        onClick={() => naxui(e.id!)}
                      >
                        naxui
                      </button>
                      <button
                        onClick={() =>
                          setArticleUserWantsToDelete(null)
                        }
                      >
                        cancel
                      </button>
                    </span>
                  </>
                )}

                <button
                  onClick={() => setArticleUserWantsToDelete(e.id)}
                  className={
                    del === e.id ? 'hidden' : 'flex text-red-700'
                  }
                >
                  delete
                </button>
              </span>
            </li>
          ))}
      </span>
    </ul>
  )
}

const SideBar = () => {
  const appState = typedUseSelector((s) => s.appState.appState)
  const render: boolean = appState === 'none'
  const { data, isSuccess } = useGetTopicsQuery('')
  const [addTopic] = useAddTopicMutation()
  const inpRef = useRef<HTMLInputElement>(null)
  const [del, { data: d, error }] = useDeleteTopicMutation()

  const submit = () => {
    new ValidateForm()
      .validateMany(
        [
          {
            input: inpRef,
            value: inpRef.current!.value,
          },
        ],
        () => {
          addTopic(inpRef.current!.value).then((e: any) => {})
        }
      )
      .catch((e) => console.log(e))
  }

  if (!render) return <></>

  return (
    <div className="flex flex-col radius bg-lessDarker rounded-lg my-2 px-1 py-2">
      <span className="flex justify-between w-48 items-center">
        <button
          className="bg-green-800 w-full mx-1 h-5 items-center flex justify-center rounded-sm"
          onClick={submit}
        >
          Add
        </button>
        <input
          type="text"
          className="bg-slate-900 border-gray-400 w-32 h-5 border rounded-md outline-none px-1"
          ref={inpRef}
        />
      </span>
      <span className="ml-2 mt-2"> Topics:</span>
      {isSuccess ? (
        <ul className="flex flex-col ml-5">
          {data.map((e, i) => (
            <li key={i} className="justify-between flex">
              <span>{e.name}</span>
              <button onClick={() => del(e.id.toString())}>❌</button>
            </li>
          ))}
        </ul>
      ) : (
        <>loading...</>
      )}
    </div>
  )
}
