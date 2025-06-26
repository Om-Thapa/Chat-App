import { LogIn, LogOut, MessageSquareMore } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const NavBar = () => {
  const { authUser, logout } = useAuthStore();

  function handleLogout(){
    logout()
  }

  return (
    <header className="flex justify-between items-center w-full fixed top-0 z-50 bg-gradient-to-r from-green-200 via-green-100 to-green-50 px-4 py-3 sm:px-8 shadow-2xl/10 border-b border-green-300">
      <div className="flex items-center space-x-3 bg-green-300/70 px-4 py-2 rounded-2xl shadow-lg/30">
        <MessageSquareMore strokeWidth={1.2} className="text-green-700" />
        <span className="hidden sm:inline text-lg font-bold text-green-800 tracking-wide drop-shadow">Talky</span>
      </div>

      <div className="flex space-x-4 sm:space-x-6 items-center">
        <Link to="/signup">
          <div className="bg-green-500 rounded-2xl shadow-lg/30 hover:ring-green-400 hover:bg-green-400 active:bg-green-300 transition">
            <button className="p-3 px-6 font-semibold text-white text-base cursor-pointer">Get Started</button>
          </div>
        </Link>

        { !authUser ? 
        <Link to="/login">
          <div className="bg-green-100 border border-green-400 p-3 rounded-2xl shadow-lg/30 flex items-center space-x-2 hover:bg-green-200 transition">
            <LogIn strokeWidth={1.2} className="text-green-700" />
            <span className="hidden sm:inline text-green-700 font-semibold">Login</span>
          </div>
        </Link>
        :
        <button type='button' onClick={handleLogout}>
          <div className="bg-green-100 border border-green-400 p-3 rounded-2xl shadow-lg/30 flex items-center space-x-2 hover:bg-green-200 transition">
            <LogOut strokeWidth={1.2} className="text-green-700" />
            <span className="hidden sm:inline text-green-700 font-semibold">Logout</span>
          </div>
        </button>}
      </div>
    </header>
  )
}

export default NavBar