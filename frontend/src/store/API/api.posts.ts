import { Topics } from '@/types/types'
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BURL,
  }),
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<
      PostPreview[],
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) =>
        `/api/posts/getMany${offset}/${limit}`,
      providesTags: ['posts'],
    }),
    getPost: builder.mutation<IPost, any>({
      query: (id: string) => ({
        url: `/api/posts/${id}`,
        method: 'GET',
      }),
    }),
    getPostsV2: builder.mutation<
      PostPreview[],
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) => ({
        url: `/api/posts/getMany${offset}/${limit}`,
      }),
    }),
    getManyWithTag: builder.mutation<
      PostPreview[],
      { offset: number; limit: number; tag: string }
    >({
      query: ({ offset, limit, tag }) => ({
        url: `/api/posts/getWithTag/${tag}/${offset}/${limit}`,
      }),
    }),
    createPost: builder.mutation({
      query: (body: IPost) => ({
        url: `/api/posts/create`,
        method: 'POST',
        body: {
          post: body,
          access: window.localStorage.getItem('access'),
        },
      }),
      invalidatesTags: ['posts'],
    }),
    editPost: builder.mutation({
      query: (body: edit) => ({
        url: `/api/posts/edit`,
        method: 'PUT',
        body: {
          post: body.post,
          id: body.id,
          access: window.localStorage.getItem('access'),
        },
      }),
      invalidatesTags: ['posts'],
    }),
    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `/api/posts/remove${id}`,
        method: 'DELETE',
        body: {
          access: window.localStorage.getItem('access'),
        },
      }),
      invalidatesTags: ['posts'],
    }),
  }),
})

type edit = {
  id: string
  post: Omit<IPost, 'c_date' | 'id' | 'topic'>
}

export interface IPost {
  id?: string
  header: string
  metatags: string
  body: string
  author: string
  image: string
  topic: string
  c_date?: string
}

export type PostPreview = Omit<IPost, 'body'>

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useGetPostMutation,
  useDeletePostMutation,
  useGetManyWithTagMutation,
  useGetPostsV2Mutation,
} = postApi
