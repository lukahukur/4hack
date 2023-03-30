import { createSlice, PayloadAction } from '@reduxjs/toolkit/'
import { IPost } from '../API/api.posts'

type initialStateType = {
  done: boolean
  data: IPost
}

export const createArticleSlice = createSlice({
  name: 'createPost',
  initialState: {
    done: false,
    data: {
      author: '',
      body: '',
      header: '',
      image: '',
      metatags: '',
      topic: '',
    },
  } as initialStateType,
  reducers: {
    articleIsDone(state, { payload }: PayloadAction<boolean>) {
      state.done = payload
    },
    setArticleDetails(state, { payload }: PayloadAction<IPost>) {
      state.data = payload
    },
  },
})

export const { setArticleDetails, articleIsDone } =
  createArticleSlice.actions
