import { useLoginMutation } from '@/store/API/api.login'
import { useRef, useState } from 'react'

export const LoginForm = () => {
  const [login] = useLoginMutation()
  const username = useRef<HTMLInputElement>(null)
  const pass = useRef<HTMLInputElement>(null)
  const access = useRef('')
  const [error, setEror] = useState('')

  const submitForm = () => {
    login({
      password: pass.current!.value,
      username: username.current!.value,
    }).then((e: any) => {
      if (e.error) {
        setEror('incorrect credentials')
        setTimeout(() => {
          setEror('')
        }, 3000)
      } else if (e.data.access) {
        console.log(e.data.access)
        localStorage.setItem('access', e.data.access)
        window.location.reload()
      }
    })
  }

  return (
    <span className="h-screen w-screen flex items-center justify-center">
      <span className="h-min w-96 flex flex-col border-2 border-gray-300 rounded-lg p-2 justify-between">
        <span className=" h-72 flex flex-col justify-between py-2">
          <span className="flex flex-col">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              className="border border-gray-500 outline-none h-10 px-2 rounded-md"
              ref={username}
            />
          </span>
          <span className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="border-gray-500 border outline-none h-10 px-2 rounded-md"
              ref={pass}
            />
          </span>{' '}
          <span className="flex justify-center">
            <button
              className="border border-gray-500 w-32 h-8 rounded-md"
              onClick={submitForm}
            >
              submit
            </button>
          </span>
        </span>
        {error && (
          <span className="flex text-red-600 justify-center items-center">
            {error}
          </span>
        )}
      </span>
    </span>
  )
}
