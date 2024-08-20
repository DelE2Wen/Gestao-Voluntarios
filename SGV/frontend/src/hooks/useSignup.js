import React from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = React.useState(false);
  const {setAuthUser} = useAuthContext()

  const signup = async({name, email, phone, password, confirmPassword}) =>{
    const success = handleInputErrors({name, email, phone, password, confirmPassword})
    if(!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, phone, password, confirmPassword})
      })
      const data = await res.json();
      if(data.error) {
        throw new Error(data.error);
      }
      const {token} = data
      localStorage.setItem("user", token)
      setAuthUser({token})
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }
  return {loading, signup};
}

export default useSignup

function handleInputErrors({name, email, phone, password, confirmPassword}) {
  if (!name || !email || !phone || !password || !confirmPassword) {
    toast.error('Por favor, preencha todos os campos');
    return false;
  }
  if (password !== confirmPassword) {
    toast.error('Senhas não coincidem');
    return false;
  }
  return true;
}