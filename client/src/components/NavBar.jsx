import { LogIn, MessageSquareMore } from 'lucide-react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <header className='flex justify-between w-full fixed top-0 z-50 bg-[#84AE92] px-4    py-3 sm:px-8 sm:py-3 shadow-2xl/10'>
        <div className='flex items-center justify-between space-x-3 shadow-lg/30 bg-[hsl(140,21%,45%)] px-4 rounded-2xl '>
            <MessageSquareMore strokeWidth={0.9} />
            <span className='hidden sm:inline'>Talky</span>
        </div>
        
        <div className='flex space-x-6'>
            <Link to='/signup'>
                <div className='bg-[hsl(64,95%,40%)] rounded-2xl shadow-lg/30 hover:ring-[hsl(64,100%,30%)] hover:bg-[hsl(66,90%,36%)] active:bg-[hsl(64,95%,34%)]'>
                    <button className='p-3 cursor-pointer'>Get Started</button>
                </div>
            </Link>

            <Link to='/login'>
                <div className='bg-[hsl(140,21%,45%)] p-3 rounded-2xl shadow-lg/30 items-center my-auto flex space-x-2'>
                    <LogIn strokeWidth={0.9} />
                    <span className='hidden sm:inline'>Login</span>
                </div>
            </Link>
        </div>
    </header>
  )
}

export default NavBar