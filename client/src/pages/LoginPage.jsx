import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeClosed, EyeOff, LoaderCircle } from 'lucide-react'

import { useAuthStore } from '../store/useAuthStore.js'

const SignUpPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false);

  const { isLoading, login, error } = useAuthStore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    login(form);
    setForm({ email: '', password: '' })
  }

  return (
    <div className='h-[calc(100vh-72px)] flex items-center mt-[72px] bg-[hsl(0,0%,90%)] bg-cover'>
      <div className="relative bg-gradient-to-br from-green-200 via-white to-green-100 max-w-3xl w-full md:w-2/3 lg:w-1/2 mx-auto rounded-3xl shadow-2xl px-8 py-12 flex flex-col items-center justify-center mt-16 mb-16">
        <h1 className="md:text-5xl text-3xl font-extrabold text-gray-800 drop-shadow-lg mb-2 text-center">
          Login your account
        </h1>
        <p className="md:text-xl text-lg text-gray-700 text-center mb-8">
          Login your <span className="text-green-500 font-bold drop-shadow-md">TALKY</span> account and start chatting!
        </p>
        <form
          className="w-full flex flex-col gap-6 max-w-md"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            <label className="block mb-1 text-gray-700 font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium" htmlFor="password">Password</label>
            <div className='flex space-x-2'>
                <input
                id="password"
                name="password"
                type={showPwd ? "type" : "password"}
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
                placeholder="Password"
                minLength={6}
              />
              <button 
              type='button'
              onClick={()=>{setShowPwd(!showPwd)}}
              className='border border-gray-300 rounded-lg p-2'>
                {showPwd 
                ? <EyeOff /> 
                : <Eye />}
              </button>
            </div>
          </div>
          {error && <p className='text-red-500 text-sm -mb-4 ml-3 font-medium'>{error}</p>}
          <button
            type="submit"
            className="w-full px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-lg"
            disabled={isLoading}
          >
            {isLoading ? 
            <div className="bg-transparent flex space-x-3 items-center justify-center">
              <LoaderCircle className="animate-spin"/>
              <p>Logging In....</p>
            </div> 
            : 
            "Login"}
          </button>
        </form>
        <div className="absolute bottom-0 right-0 m-4 opacity-30 pointer-events-none select-none">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="60" fill="#FDE68A" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage