import { Users, Circle, Loader2 } from 'lucide-react'
import React from 'react'
import ProfilePic from '../public/avatar.png'
import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const SideBar = () => {
  const { users, getUser, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUser();
  },[getUser])

  if(isUserLoading) return (
        <aside className="h-24/25 w-20 md:w-72 flex bg-white/90 shadow-2xl rounded-2xl items-center border border-green-100">
          <Loader2 className='animate-spin mx-auto size-8' />
        </aside>
  )

  return (
    <aside className="h-24/25 w-20 md:w-72 flex flex-col bg-white/90 shadow-2xl rounded-2xl overflow-y-auto transition-all duration-200 border border-green-100">
      {/* Header */}
      <div className="flex h-15 items-center gap-3 px-4 border-b border-green-100 bg-gradient-to-r from-green-200/60 to-green-50/60">
        <Users className="size-7 text-green-600" />
        <span className="font-bold text-lg text-green-800 tracking-wide drop-shadow hidden md:block">Friends</span>
      </div>
      {/* User List */}
      <ul className="flex-1 mt-1.5 pb-4 px-2 space-y-2">
        {users.map(user => (
          <li
            key={user._id}
            className={`flex bg-green-100 items-center gap-3 px-3 py-2 rounded-xl hover:bg-green-300/80 transition cursor-pointer ${user._id === selectedUser?._id ? 'bg-green-300/70' : 'bg-green-100' }`}
            onClick={()=>setSelectedUser(user)}
          >
            <div className="relative">
              <span className={`inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full text-green-800 bg-green-200 font-bold text-lg uppercase shadow group-hover:bg-green-300 transition`}>
                <img src={user.profilePic ||  ProfilePic} className='object-fill' alt="Profile" />
              </span>
              <Circle
                className={`absolute -bottom-1 -right-1 w-3 h-3 ${
                  onlineUsers.includes(user._id) ? "text-green-500" : "text-gray-400"
                }`}
                fill={onlineUsers.includes(user._id) ? "#22c55e" : "#d1d5db"}
                strokeWidth={3}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 text-base truncate max-w-[120px] hidden md:block">
                {user.fullname}
              </span>
              <span className={`text-xs ${onlineUsers.includes(user._id) ? "text-green-600" : "text-gray-400"} hidden md:block`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </span>
            </div>
          </li>
        ))}
      </ul>
      {/* Footer */}
      <div className="px-4 py-3 border-t border-green-100 text-xs text-gray-500 text-center hidden md:block">
        &copy; {new Date().getFullYear()} Talky
      </div>
    </aside>
  )
}

export default SideBar