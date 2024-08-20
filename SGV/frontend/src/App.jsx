import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'
import Login from './pages/login/Login'
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/home/Home';
import UserLayout from './components/UserLayout'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext';


const App = () => {
  const {authUser}= useAuthContext()
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path = "/" element ={authUser ? <Home/> : <Navigate to="/login" />}/>
          <Route path = "/cadastrar" element = {authUser ? <Navigate to="/" /> : <SignUp/>} />
          <Route path = "/login" element = {authUser ? <Navigate to="/" /> : <Login/>} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App