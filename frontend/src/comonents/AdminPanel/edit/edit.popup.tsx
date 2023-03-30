import { IPost, useEditPostMutation } from '@/store/API/api.posts'
import { isDone } from '@/store/slices/edit.slice'
import { setAppState } from '@/store/slices/global'
import { typedDispatch, typedUseSelector } from '@/store/store'
import { FC, MutableRefObject, useRef } from 'react'

const EditorSubmitPopup: FC<{
  fullArticle: MutableRefObject<any>
  id: number
  others: Omit<IPost, 'c_date' | 'id' | 'topic' | 'body' | 'header'>
}> = ({ fullArticle, id, others }) => {
  const isDoneOrnot = typedUseSelector((s) => s.editorSlice.isDone)
  const dispatch = typedDispatch()
  const [submitEdit, { data }] = useEditPostMutation()
  const authorRef = useRef<HTMLInputElement>(null)
  const imageLinkRef = useRef<HTMLInputElement>(null)
  const metaRef = useRef<HTMLTextAreaElement>(null)

  const getHeader = (a: MutableRefObject<any>) =>
    a.current!.split('\n')[0].slice(2, fullArticle.current!.length)

  return (
    <span
      style={{
        width: '400px',
        height: '500px',
      }}
      className={
        isDoneOrnot
          ? `flex p-2 absolute border
             border-gray-800 font-OpenSans
             bg-dark z-50 top-1/2 text-gray-300 
             left-1/2 -translate-x-1/2 -translate-y-1/2 
             rounded-xl`
          : 'hidden'
      }
    >
      <span className="flex flex-col justify-between">
        <span className="h-52 flex flex-col justify-between">
          <span className="flex flex-col">
            <span>Title(auto):</span>
            <span>{getHeader(fullArticle)}</span>
          </span>
          <span className="flex flex-col">
            <span>Author</span>
            <input
              placeholder={others.author}
              ref={authorRef}
              type="text"
              className="bg-slate-900 rounded-md
               border-gray-500 border px-1 outline-none"
            />
          </span>
          <span className="flex flex-col">
            <span>Image link</span>
            <input
              placeholder={others.image}
              ref={imageLinkRef}
              type="text"
              className="bg-slate-900 rounded-md
               border-gray-500 border px-1 outline-none"
            />
          </span>
        </span>
        <span className="flex flex-col">
          <span>Meta</span>
          <textarea
            placeholder={others.metatags}
            ref={metaRef}
            style={{ resize: 'none' }}
            className="bg-slate-900 p-1 h-40 rounded-md 
                      border-gray-500 border px-1 outline-none"
          />
        </span>

        <span className="flex w-96 justify-between ">
          <button
            onClick={() => {
              dispatch(isDone(false))

              submitEdit({
                id: id.toString(),
                post: {
                  author: authorRef.current!.value || others.author,
                  body: fullArticle.current!,
                  header: getHeader(fullArticle),
                  image: imageLinkRef.current!.value || others.image,
                  metatags: metaRef.current!.value || others.metatags,
                },
              }).then((e) => {
                window.location.reload()
              })
            }}
          >
            Submit
          </button>
          <button onClick={() => dispatch(isDone(false))}>
            Cancel
          </button>
        </span>
      </span>
    </span>
  )
}
export default EditorSubmitPopup
