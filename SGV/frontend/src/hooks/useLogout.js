import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast'

const useLogous = () => {
  const [loading, setLoading] = React.useState(false);
  const {setAuthUser}= useAuthContext()

  const logout = async () =>{
    setLoading(true)
    try {
      await fetch("http://localhost:5000/users/logout", {
        method: 'POST',
        headers: {"Content-Type": "application/json"}
      });
      localStorage.removeItem('user');
      setAuthUser(null)
      window.location.href = '/login';
    } catch (error) {
      toast.error(error.message);
    } finally{
      setLoading(false)
    }
  }
  return {loading, logout}
}

export default useLogous