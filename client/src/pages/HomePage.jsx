import React, { useEffect } from 'react'
import SideBar from '../components/SideBar';
import NoChatContainer from '../components/NoChatContainer';
import { useChatStore } from '../store/useChatStore';
import { ChatContainer } from '../components/ChatContainer';
import { useAuthStore } from '../store/useAuthStore';

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { connectSocket } = useAuthStore();

  useEffect(() => {
    connectSocket();
  }, [connectSocket])
  return (
    <div className='h-[calc(100vh-72px)] flex items-center mt-[72px] bg-[hsl(0,0%,90%)] bg-cover'>
      <div className='h-full w-full bg-linear-240 from-green-200 via-gray-200 to-green-300 overflow-hidden flex justify-evenly items-center'>
        <SideBar />

        
        {!selectedUser ? <NoChatContainer /> : <ChatContainer />}
      </div>
    </div>
  )
}

export default HomePage