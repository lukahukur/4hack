import { useCreatePostMutation } from '@/store/API/api.posts'
import { useGetTopicsQuery } from '@/store/API/api.topics'
import { setAppState } from '@/store/slices/global'
import { typedDispatch, typedUseSelector } from '@/store/store'
import { Topics } from '@/types/types'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { DropDown } from './dropdown'
import ValidateForm from '../validator'

export const PopupCreatePost: FC<{
  setFinishState: (...a: any[]) => void
}> = ({ setFinishState }) => {
  const [topic, setTopic] = useState<string | undefined>()
  const imageLink = useRef<HTMLInputElement>(null)
  const author = useRef<HTMLInputElement>(null)
  const dispatch = typedDispatch()
  const metaDescription = useRef<any>(null)
  const topicRef = useRef<any>(null)
  const [createPost, { isSuccess, error }] = useCreatePostMutation()
  const show = typedUseSelector((s) => s.createPost.done)
  const [title, setTitle] = useState('')
  const isDone = typedUseSelector((s) => s.createPost.done)
  const { data: topics, isSuccess: sucksAss } = useGetTopicsQuery('')
  const [getTopics, setTopics] = useState<Topics[] | null>() // for dropdown,

  useEffect(() => {
    sucksAss && setTopics(topics)
  }, [topics])

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    let input = e.target.value

    setTopics((arr) => {
      return topics!.filter((word) =>
        word.name
          .toLowerCase()
          .includes(input.toLocaleLowerCase().trim())
      )
    })
  }

  useEffect(() => {
    localStorage.getItem('text')
      ? setTitle(
          localStorage
            .getItem('text')!
            .split('\n')[0]
            .slice(2, localStorage.getItem('text')!.length)
        )
      : setTitle('')
  }, [isDone])

  const submit = () => {
    new ValidateForm()
      .validateMany(
        [
          {
            input: author,
            value: author.current!.value,
          },
          {
            input: imageLink,
            value: imageLink.current!.value,
          },
          {
            input: metaDescription,
            value: metaDescription.current!.value,
          },
          {
            input: topicRef,
            value: topic,
          },
        ],
        () => {
          createPost({
            author: author.current!.value,
            body: localStorage.getItem('text')!,
            header: title,
            image: imageLink.current!.value,
            metatags: metaDescription.current!.value,
            topic: topic!,
          }).then((e: any) => {
            localStorage.removeItem('text')
            dispatch(setAppState('none'))
          })
        }
      )
      .catch((e) => console.log(e))
  }

  return (
    <span
      style={{
        width: '900px',
        height: '370px',
        display: show ? 'flex' : 'none',
      }}
      className="text-slate-200 bg-dark font-OpenSans 
      absolute justify-start flex-col flex top-1/2 left-1/2 border
       border-slate-800 rounded-xl  p-2 
       -translate-x-1/2 -translate-y-1/2"
    >
      <span className="flex flex-col   h-min w-full p-1 rounded-md ">
        <span className="flex flex-col">
          <span
            style={{ fontFamily: 'OpenSansBold ' }}
            className="font-bold text-base"
          >
            Title (auto):{' '}
          </span>
          <span>{title}</span>
        </span>
      </span>
      <span className="flex flex-row items-center justify-between">
        <span className="flex flex-col  h-60 justify-start">
          <span className="flex flex-col justify-between px-1 items-start">
            <label style={{ fontFamily: 'OpenSansBold ' }}>
              Author
            </label>
            <input
              type="text"
              className="border border-gray-500 rounded-md px-1 bg-slate-900 outline-none "
              ref={author}
            />
          </span>
          <span className="flex flex-col justify-between px-1 items-start">
            <label
              style={{ fontFamily: 'OpenSansBold ' }}
              className="mt-2"
            >
              Cover image link
            </label>
            <input
              type="text"
              className="border border-gray-500 rounded-md px-1 bg-slate-900 outline-none "
              ref={imageLink}
            />
          </span>
          <span className="flex  flex-col justify-center">
            {sucksAss && getTopics && (
              <DropDown
                getTopics={getTopics!}
                onChange={onChange}
                setTopic={(e) => setTopic(e)}
                topic={topic}
                topics={topics}
                topicRef={topicRef}
              />
            )}
          </span>
        </span>
        <span className="flex flex-col justify-start h-60 w-full">
          <span className="flex flex-col justify-between px-1 items-start">
            <label style={{ fontFamily: 'OpenSansBold ' }}>
              Meta description
            </label>
            <textarea
              className="border w-full border-gray-500 rounded-md p-1 bg-slate-900 outline-none "
              ref={metaDescription}
            />
          </span>
        </span>
      </span>

      <span className="flex items-end justify-between px-1 h-60 ">
        <button onClick={submit}>Submit</button>
        <button onClick={() => setFinishState(false)}>Cancel</button>
      </span>
    </span>
  )
}
