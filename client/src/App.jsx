import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'

import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import SettingPage from './pages/SettingPage';
import { useAuthStore } from './store/useAuthStore';
import HomePage from './pages/HomePage';

function App() {
  const { authUser, logout, checkAuth } = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth, logout])

  return (
    <>

      <NavBar />

        <Routes>
          <Route path='/' index element={<WelcomePage />}/>
          <Route path='/home' element={authUser ? <HomePage />: <Navigate to='/signup' />}/>
          <Route path='/login' element={authUser ? <Navigate to='/home' /> : <LoginPage />}/>
          <Route path='/signup' element={authUser ? <Navigate to='/home' /> : <SignUpPage />}/>
          <Route path='/settings' element={authUser ? <SettingPage /> : <Navigate to='/signup' />}/>
        </Routes>
      


      <Toaster />
    </>
  )
}

export default App
