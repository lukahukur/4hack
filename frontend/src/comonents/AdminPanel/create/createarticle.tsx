import { articleIsDone } from '@/store/slices/create.slice'
import { typedDispatch, typedUseSelector } from '@/store/store'
import { useRef } from 'react'
import ArticleEditor from '../articleEditor/markdown.article'
import { PopupCreatePost } from './create.popup'

export default function CreateAPost() {
  const wholeText = useRef('')
  const previewState = typedUseSelector((s) => s.EditorState.preview)
  const editorState = typedUseSelector((s) => s.appState.appState)
  const render = editorState === 'creating'
  const dispatch = typedDispatch()

  return (
    <span className={render ? 'flex w-full h-full' : 'hidden'}>
      <ArticleEditor
        getArticle={(e) => (wholeText.current = e)}
        useLocalStorage={true}
        previewState={!previewState}
      />
      <PopupCreatePost
        setFinishState={(e) => dispatch(articleIsDone(e))}
      />
    </span>
  )
}
