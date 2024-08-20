import React from 'react'
import toast from 'react-hot-toast'

const useGetConversations = () => {
  const [loading, setLoading] = React.useState(false);
  const [conversations, setConversations] = React.useState([]);
  React.useEffect( () => {
    const getConversations = async () =>{
      setLoading(true);
      try {
        const token = localStorage.getItem('user')
        const res = await fetch("http://localhost:5000/userSideBar",{
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = await res.json();
        if(data.erro) {
          throw new Error(data.error)
        }
        setConversations(data)
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false)
      }
    }
    getConversations();
  },[])
  return {loading, conversations}
}

export default useGetConversations