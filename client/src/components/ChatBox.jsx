import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {
  
  const {selectedChats, theme} = useAppContext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      if(selectedChats){
        setMessages(selectedChats.messages)
      }
  },[selectedChats])

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      <div className="flex-1 mb-5 overflow-y-scroll">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-primary">
            <img
              src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
              alt=""
              className="w-full max-w-56"
            />
            <p className="mt-5 text-4xl text-center text-gray-400 dark:text-white">
              Ask me anything...
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      
      </div>
    </div>
  );
}

export default ChatBox
