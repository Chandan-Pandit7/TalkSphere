import React, { useEffect } from 'react'
import "./App.css"
import { Toaster } from 'react-hot-toast'
import { authStore } from './store/authStore.js'
import { Loader } from 'lucide-react'
import { Navigate,Route,Routes } from 'react-router-dom'


import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Navbar from './components/Navbar.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import HomePage from './pages/HomePage.jsx'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=authStore();
  // console.log(onlineUsers);

  useEffect(()=>{
    checkAuth();
  },[checkAuth])


  if (isCheckingAuth && !authUser) {
    return (<div className="flex items-center justify-center h-screen">
      <Loader className='size-10 animate-spin'/>
    </div>)
  }


  return (
    <div>

      <Navbar/>

      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to='/login'/>} />   
        <Route path="/signup" element={ !authUser ? <SignupPage /> : <Navigate to='/'/>} />
			  <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to='/'/>} />
				<Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to='/login'/> } />
      </Routes>


      <Toaster/>
      
    </div>
  )
}

export default App