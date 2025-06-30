import { LogIn, LogOut, MessageSquareMore, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore';

const NavBar = () => {
  const { authUser, logout } = useAuthStore();
  const { setSelectedUser } = useChatStore();

  function handleLogout(){
    logout();
    setSelectedUser(null);
  }

  return (
    <header className="flex justify-between items-center w-full fixed top-0 z-50 bg-gradient-to-r from-green-200 via-green-100 to-green-100 px-4 py-3 sm:px-8 shadow-2xl/10 border-b border-green-100">
      <Link to='/'>
        <div className="flex items-center space-x-3 bg-green-300/70 px-4 py-2 rounded-2xl shadow-lg/30">
          <MessageSquareMore strokeWidth={1.2} className="text-green-700 mx-auto" />
          <span className="hidden sm:inline text-lg font-bold text-green-800 tracking-wide drop-shadow">Talky</span>
        </div>
      </Link>

      <div className={`items-center flex ${authUser ? 'flex-row-reverse gap-3' : 'flex-row space-x-2 sm:space-x-4'}`}>
        {authUser 
        ?
        <Link to="/settings">
          <div className="bg-green-100 border border-green-400 p-3 rounded-2xl shadow-lg/30 flex items-center  gap-2 hover:bg-green-200 transition">
            <Settings strokeWidth={1.2} className="text-green-700 mx-auto" />
            <span className="hidden sm:inline text-green-700 font-semibold">Settings</span>
          </div>
        </Link>
        : 
        <Link to="/signup">
          <div className="bg-green-500 rounded-2xl shadow-lg/30 hover:ring-green-400 hover:bg-green-400 active:bg-green-300 transition">
            <button className="p-3 px-6 font-semibold text-white text-base cursor-pointer">Get Started</button>
          </div>
        </Link>}

        {!authUser ? 
        <Link to="/login">
          <div className="bg-green-100 border border-green-400 p-3 rounded-2xl shadow-lg/30 flex items-center gap-2 hover:bg-green-200 transition">
            <LogIn strokeWidth={1.2} className="text-green-700 mx-auto" />
            <span className="hidden sm:inline text-green-700 font-semibold">Login</span>
          </div>
        </Link>
        :
        <button type='button' onClick={handleLogout}>
          <div className="bg-green-100 border border-green-400 p-3 rounded-2xl shadow-lg/30 flex items-center gap-2 hover:bg-green-200 transition">
            <LogOut strokeWidth={1.2} className="text-green-700 mx-auto" />
            <span className="hidden sm:inline text-green-700 font-semibold">Logout</span>
          </div>
        </button>}
      </div>
    </header>
  )
}

export default NavBar