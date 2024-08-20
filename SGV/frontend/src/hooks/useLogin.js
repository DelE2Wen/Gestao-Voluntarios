import React from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const { setAuthUser } = useAuthContext()

  const login = async ({email, password }) => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Erro desconhecido")
      }
      const {token} = data
      localStorage.setItem("user", token)
      setAuthUser({token})
      return true;
    } catch (error) {
      toast.error(error.message)
      return false;
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}

export default useLogin
