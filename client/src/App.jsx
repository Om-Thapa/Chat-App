import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'

import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to="/welcome" />}/>
        <Route path='/welcome' index element={<WelcomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
      </Routes>

      <Toaster />
    </>
  )
}

export default App
