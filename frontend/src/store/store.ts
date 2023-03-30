import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import { loginAPI } from './API/api.login'
import { postApi } from './API/api.posts'
import TopicsApi from './API/api.topics'
import { AdminPageManager } from './middleware/middleware'
import { createArticleSlice } from './slices/create.slice'
import { CurrentEditedPageSlice } from './slices/edit.slice'
import { GlobalState } from './slices/global'
import { EditorState } from './slices/ide.state'
import { UIslice } from './slices/UI.slice'

export const store = () =>
  configureStore({
    reducer: {
      [TopicsApi.reducerPath]: TopicsApi.reducer,
      [postApi.reducerPath]: postApi.reducer,
      [CurrentEditedPageSlice.name]: CurrentEditedPageSlice.reducer,
      [loginAPI.reducerPath]: loginAPI.reducer,
      [GlobalState.name]: GlobalState.reducer,
      [EditorState.name]: EditorState.reducer,
      [createArticleSlice.name]: createArticleSlice.reducer,
      [UIslice.name]: UIslice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).prepend(
        TopicsApi.middleware,
        postApi.middleware,
        loginAPI.middleware,
        AdminPageManager
      ),
  })

export type AppStore = ReturnType<typeof store>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const typedDispatch = useDispatch<AppDispatch>
export const typedUseSelector: TypedUseSelectorHook<AppState> =
  useSelector
export const wrapper = createWrapper<AppStore>(store)
