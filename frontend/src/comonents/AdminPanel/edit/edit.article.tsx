import { IPost, useGetPostMutation } from '@/store/API/api.posts'
import { editedArticle } from '@/store/slices/edit.slice'
import { typedDispatch, typedUseSelector } from '@/store/store'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import ArticleEditor from '../articleEditor/markdown.article'
import EditorSubmitPopup from './edit.popup'

export const EditAnArticle = () => {
  const fullArticle = useRef('')
  const appState = typedUseSelector((s) => s.appState.appState)

  const previewState = typedUseSelector((s) => s.EditorState.preview)
  const render: boolean = appState === 'editing'

  const [getPost, { data: text, error }] = useGetPostMutation()
  const targetArticle = typedUseSelector(
    (e) => e.editorSlice.targetArticle
  )

  useEffect(() => {
    if (targetArticle) {
      getPost(targetArticle)
    }
  }, [targetArticle])

  return render && text && targetArticle ? (
    <span className={'flex w-full h-full'}>
      <EditorSubmitPopup
        fullArticle={fullArticle}
        id={targetArticle!}
        others={{
          author: text.author,
          image: text.image,
          metatags: text.metatags,
        }}
      />
      <ArticleEditor
        getArticle={(e) => {
          fullArticle.current = e
        }}
        previewState={!previewState}
        useLocalStorage={false}
        text={text.body}
      />
    </span>
  ) : (
    <></>
  )
}
