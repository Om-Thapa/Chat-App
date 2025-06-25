import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return (
    <div className='flex items-center bg-[hsl(140,21%,50%)] h-screen'>
        <div className='relative max-w-5xl w-1/2 h-auto md:px-8 mx-auto rounded-2xl bg-[hsl(140,21%,45%)] px-4 py-4 flex space-y-2 flex-col justify-around'>
            <h1 className='md:text-7xl text-5xl font-bold text-[hsl(0,0%,15%)]'>Welcome,</h1>
            <p className='md:text-5xl text-2xl text-end'>to <span className='text-[rgb(186,199,5)] text-shadow-lg/25'>TALKY</span></p>
            
            <div className='bg-[hsl(64,95%,35%)] absolute -bottom-9 -right-8 rounded-2xl shadow-lg/30'>
                <Link to='/signup'>
                    <button className='p-3 cursor-pointer'>Create Account</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default WelcomePage