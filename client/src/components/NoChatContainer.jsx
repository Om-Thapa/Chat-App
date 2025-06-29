import React from 'react'
import { MessageSquare } from 'lucide-react'

const NoChatContainer = () => {
  return (
       <div className='backdrop-blur-3xl h-24/25 w-[calc(100%-7rem)] md:w-[calc(100%-20rem)] drop-shadow-2xl shadow-2xl/65 bg-white/90 shadow-2xl rounded-2xl overflow-y-auto transition-all duration-200 border border-green-100 flex flex-col justify-center'>
        <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl bg-green-200 flex items-center
                justify-center animate-bounce"
              >
                <MessageSquare className="w-8 h-8 " />
              </div>
            </div>
          </div>
  
          {/* Welcome Text */}
          <h2 className="text-2xl text-center font-bold">Welcome to Chatty!</h2>
          <p className="text-black/80 text-center">
            Select a conversation from the sidebar to start chatting
          </p>
       </div>
  )
}

export default NoChatContainer