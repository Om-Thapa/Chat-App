import React, { useEffect, useRef } from 'react'
import Profile from '../public/avatar.png'
import { Loader, X } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore  }from '../store/useAuthStore'
import MessageInput from './MessageInput'

export const ChatContainer = () => {
    const { 
      messages, 
      getMessages, 
      selectedUser, 
      isMessageLoading, 
      setSelectedUser,
      subscribeToMessages,
      unsubscribeFromMessage
    } = useChatStore();
    const { authUser, onlineUsers } = useAuthStore();
    const messEndRef = useRef();

    useEffect(() => {
      getMessages(selectedUser._id);

      subscribeToMessages();

      // return unsubscribeFromMessage();
    },[selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessage]);
    
    useEffect(() => {
      if(messEndRef.current && messages)
        messEndRef.current.scrollIntoView({ behavior: "smooth"});

    },[messages])

    if(isMessageLoading){
      return (
        <div className='size-full justify-center items-center h-24/25 w-[calc(100%-7rem)] md:w-[calc(100%-20rem)] shadow-2xl bg-white/80 rounded-2xl overflow-y-auto transition-all duration-200 border border-green-100 flex flex-col'>
          <div className='bg-amber-100/50 size-25 drop-shadow-2xl/20 border-1 border-green-300/50 flex flex-col items-center justify-center rounded-2xl space-y-1.5'>
            <Loader size={20} className='animate-spin' />
            <p className='text-sm text-center'>Loading Messages....</p>
          </div>
        </div>
      )
    }

    return (
       <div 
       className='h-24/25 w-[calc(100%-7rem)] md:w-[calc(100%-20rem)] shadow-2xl bg-white/80 rounded-2xl overflow-y-auto transition-all duration-200 border border-green-100 flex flex-col'
       >

            {/* Chat-Box Header */}
            <div className="px-4 py-3 text-md shadow-md/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="avatar">
                    <div className="size-12 rounded-full relative">
                      <img src={selectedUser.profilePic || Profile} alt="Profile" />
                    </div>
                  </div>
        
                  {/* User info */}
                  <div>
                    <h3 className="font-medium">{selectedUser.fullname}</h3>
                    <p className="text-sm text-base-content/70">
                      {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
        
                {/* Close button */}
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
              </div>
            </div>

            {/* Main Containter */}
            <div className='flex-1 h-[calc(100%-132px)] scrollbar-thin overflow-y-auto w-full bg-amber-100/30'
            >
              {messages.map((mes)=>(
                <div key={mes._id} className={`flex mb-2 flex-col ${mes.senderId === authUser._id ? "items-end" : "items-start"} w-full`}>
                  <div className='max-w-4/5 rounded-sm mx-2 bg-green-300/80 px-2 py-1'>
                    {mes.image && (
                      <img 
                          src={mes.image} 
                          alt="Attachment"
                          className='sm:max-w-[200px] rounded-sm'   
                        />
                      )}
                      {mes.text && <p className='w-auto text-start text-sm text-wrap'>{mes.text}
                    </p>}
                  </div>
                  <span 
                  className='text-[8px] sm:text-xs mx-2.5'
                  ref={messEndRef}
                  >{new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}</span>
                </div>
              ))}
            </div>

            {/* Input-Bar */}
            <MessageInput />
       </div>
  )
}
