import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'

import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  const UserCard = () => {
    return (
      <div className='mx-auto p-6 flex flex-col gap-4 bg-white rounded-2xl shadow-2xl/20'>
        <h1>User Details</h1>
        <div>
          <p>{"Name : " + authUser.fullname}</p>
          <p>{"Email : " + authUser.email}</p>
          <p>{"Account Created On : " 
          + new Date(authUser.updatedAt).toLocaleString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "Asia/Kolkata"
            })
          }</p>
          <p>{
            "Last Login : " 
            + new Date(authUser.updatedAt).toLocaleString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Kolkata"
          })
          }</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <NavBar />

      <div className='h-[calc(100vh-72px)] flex items-center mt-[72px] bg-[hsl(0,0%,90%)] bg-cover'>

        <Routes>
          <Route path='/' index element={<WelcomePage />}/>
          <Route path='/home' element={authUser ? <UserCard />: <Navigate to='/signup' />}/>
          <Route path='/login' element={authUser ? <Navigate to='/home' /> : <LoginPage />}/>
          <Route path='/signup' element={authUser ? <Navigate to='/home' /> : <SignUpPage />}/>
        </Routes>
      
      </div>


      <Toaster />
    </>
  )
}

export default App
