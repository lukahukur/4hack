import { AdminPanel } from '@/comonents/AdminPanel/Index.creator'
import { LoginForm } from '@/comonents/AdminPanel/login.form'
import { useLoginMutation } from '@/store/API/api.login'
import { decode } from 'jsonwebtoken'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const God = () => {
  const [pass, setIfHeCanPass] = useState(true)
  const { setTheme } = useTheme()
  useEffect(() => {
    if (!localStorage.getItem('access')) {
      setIfHeCanPass(false)
    } else {
      try {
        decode(localStorage.getItem('access') || ' ')
        setIfHeCanPass(true)
      } catch (err) {
        setIfHeCanPass(false)
      }
    }
    setTheme('light')
  }, [])

  return pass ? <AdminPanel /> : <LoginForm />
}

export default God
