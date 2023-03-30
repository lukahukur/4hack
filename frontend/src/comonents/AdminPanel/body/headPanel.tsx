import { articleIsDone } from '@/store/slices/create.slice'
import {
  isDone,
  removeTargetArticle,
} from '@/store/slices/edit.slice'
import { setAppState } from '@/store/slices/global'
import { reversePreviewState } from '@/store/slices/ide.state'
import { typedDispatch, typedUseSelector } from '@/store/store'

export default function HeadPanel() {
  return (
    <span className="flex justify-between px-2 items-center h-min py-1 bg-lessDarker">
      <span className="flex items-center">
        <DefaultPanel />
        <CreatePostPanel />
        <EditPostPanel />
      </span>

      <button
        className="flex text-blue-100 pr-5"
        onClick={() => {
          localStorage.removeItem('access')
          window.location.reload()
        }}
      >
        logout
      </button>
    </span>
  )
}

const CreatePostPanel = () => {
  const appState = typedUseSelector((s) => s.appState.appState)
  const render: boolean = appState === 'creating'
  const dispatch = typedDispatch()

  return (
    <span className={render ? 'flex h-7 items-center' : 'hidden'}>
      <button
        className="flex bg-slate-800 px-2 my-1 rounded-md "
        onClick={() => dispatch(setAppState('none'))}
      >
        cancel
      </button>

      <button
        className="flex bg-slate-800 px-2  rounded-md mx-3"
        onClick={() => {
          dispatch(reversePreviewState())
        }}
      >
        Preview on/off
      </button>
      <button
        className="flex bg-green-800 px-2  rounded-md mx-3"
        onClick={() => dispatch(articleIsDone(true))}
      >
        Done
      </button>
    </span>
  )
}

const EditPostPanel = () => {
  const appState = typedUseSelector((s) => s.appState.appState)
  const render: boolean = appState === 'editing'
  const dispatch = typedDispatch()

  return (
    <>
      <span
        className={
          render ? 'flex w-80 justify-between items-center' : 'hidden'
        }
      >
        <button
          className="bg-slate-800 px-2 rounded-md"
          onClick={() => dispatch(setAppState('none'))}
        >
          Cancel
        </button>
        <button
          className="bg-slate-800 px-2 rounded-md"
          onClick={() => {
            dispatch(reversePreviewState())
          }}
        >
          Preview on/off
        </button>
        <button
          className="bg-green-800 px-2 rounded-md"
          onClick={() => dispatch(isDone(true))}
        >
          Submit Edit
        </button>
      </span>
    </>
  )
}

const DefaultPanel = () => {
  const appState = typedUseSelector((s) => s.appState.appState)
  const render: boolean = appState === 'none'
  const dispatch = typedDispatch()

  return (
    <span
      className={
        render ? 'flex w-80 justify-between items-center' : 'hidden'
      }
    >
      <button
        className="bg-slate-800 px-2 rounded-md"
        onClick={() => dispatch(setAppState('creating'))}
      >
        Create Post
      </button>
    </span>
  )
}
