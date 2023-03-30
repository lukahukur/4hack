import { Topics } from '@/types/types'
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

const TopicsApi = createApi({
  reducerPath: 'TopicsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BURL,
  }),
  tagTypes: ['Topic'],
  endpoints: (builder) => ({
    getTopics: builder.query<Topics[], any>({
      query: () => `/api/topics`,
      providesTags: ['Topic'],
    }),
    deleteTopic: builder.mutation({
      query: (id: string) => ({
        url: `/api/topics/delete${id}`,
        method: 'DELETE',
        body: {
          access: window.localStorage.getItem('access'),
        },
      }),
      invalidatesTags: ['Topic'],
    }),
    addTopic: builder.mutation({
      query: (topic: string) => ({
        url: `/api/topics/add`,
        method: 'POST',
        body: {
          topic: topic,
          access: window.localStorage.getItem('access'),
        },
      }),
      invalidatesTags: ['Topic'],
    }),
  }),
})
export default TopicsApi
export const {
  useGetTopicsQuery,
  useDeleteTopicMutation,
  useAddTopicMutation,
} = TopicsApi
