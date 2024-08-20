import React from 'react'

export const AuthContext = React.createContext()

export const useAuthContext = () => {
  return React.useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser] = React.useState(localStorage.getItem("user") || null)

  return (<AuthContext.Provider value={{authUser, setAuthUser}}>
    {children}
    </AuthContext.Provider>)
}