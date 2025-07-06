import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return (
    <div className='h-[calc(100vh-72px)] flex items-center mt-[72px] bg-[hsl(0,0%,90%)] bg-cover'>
      <div className="relative bg-gradient-to-br from-green-100 via-white to-green-50 max-w-3xl w-full md:w-2/3 lg:w-1/2 mx-auto rounded-3xl shadow-2xl px-8 py-12 flex flex-col items-center justify-center mt-16 mb-16">
        <h1 className="md:text-7xl text-5xl font-extrabold text-gray-800 drop-shadow-lg mb-2 text-center">
          Welcome,
        </h1>
        <p className="md:text-4xl text-2xl text-gray-700 text-center mb-8">
          to <span className="text-green-500 font-bold drop-shadow-md">TALKY</span>
        </p>
        <p className="text-lg md:text-xl text-gray-600 text-center mb-10 max-w-xl">
          Connect, chat, and share with friends and new people. Experience seamless messaging in a vibrant, modern interface.
        </p>
        <div className="w-full flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link to="/signup" className="w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-lg">
              Create Account
            </button>
          </Link>
          <Link to="/login" className="w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-3 bg-white border border-green-400 text-green-600 font-semibold rounded-xl shadow hover:bg-green-50 transition-all duration-200 text-lg">
              Login
            </button>
          </Link>
        </div>
        <div className="absolute bottom-0 right-0 m-4 opacity-30 pointer-events-none select-none">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="60" fill="#FDE68A" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage