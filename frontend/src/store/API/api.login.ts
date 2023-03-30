import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

export const loginAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BURL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      any,
      { username: string; password: string }
    >({
      query: (body) => ({
        url: `/api/auth/signin`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
})

export const { useLoginMutation } = loginAPI
