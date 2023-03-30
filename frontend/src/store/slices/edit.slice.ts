import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isPostfixUnaryExpression } from 'typescript'
import { IPost } from '../API/api.posts'

type initialState = {
  targetArticle: undefined | number
  wholePost: Omit<IPost, 'id' | 'c_date' | 'topic'>
  isDone: boolean
  fetchPost: IPost | undefined
}

export const CurrentEditedPageSlice = createSlice({
  name: 'editorSlice',
  initialState: {
    targetArticle: undefined,
    wholePost: {
      author: '',
      body: '',
      header: '',
      image: '',
      metatags: '',
    },
    fetchPost: {
      author: '',
      body: '',
      header: '',
      image: '',
      metatags: '',
      topic: '',
      c_date: '',
      id: '',
    },
    isDone: false,
  } as initialState,
  reducers: {
    setTargetArticle(state, { payload }) {
      state.targetArticle = payload
    },
    removeTargetArticle(state) {
      state.targetArticle = undefined
    },
    editedArticle(state, { payload }) {
      state.wholePost = payload
    },
    isDone(state, { payload }) {
      state.isDone = payload
    },
  },
})

export const {
  removeTargetArticle,
  setTargetArticle,
  editedArticle,
  isDone,
} = CurrentEditedPageSlice.actions
