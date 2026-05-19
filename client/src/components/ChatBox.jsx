import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {
  
  const {selectedChats, theme} = useAppContext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    e.preventdefault()
  }

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

        {
          loading && 
          
          <div className="flex items-start gap-2 my-4 w-full">
                    <img
                      src={assets.logo}
                      alt="user"
                      className="w-7 rounded-full"
                    />
            <div className='loader flex itmes-center gap-1.5'>
                <div className='w-1 h-1 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
                <div className='w-1 h-1 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
                <div className='w-1 h-1 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            </div>
          </div>          
        }

        {mode === 'image' && (
          <div className='flex justify-center'>
              <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
                <p className='text-xs'>Publish Generated Image to Community</p>
                <input type="checkbox" className='cursor-pointer' checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)}/>
              </label>
          </div>
        )}

        <form onSubmit={onSubmit} className='bg-blue-200 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 max-auto flex gap-4 items-center '>
          <select className='text-sm pl-3 pr-2 outline-none' onChange={(e) => setMode(e.target.value)} value={mode}>
            <option value="text" className='dark:bg-blue-400'>Text</option>
            <option value="image" className='dark:bg-blue-400'>Image</option>
          </select>
          <input type="text" onChange={(e) => setPrompt(e.target.vale)} value={prompt} placeholder='Type your prompt here...' className='flex-1 w-full text-sm outline-none' required/>
          <button disabled={loading}>
            <img src={loading ? assets.stop_icon : assets.send_icon} alt="" className='w-8 cursor-pointer'/>
          </button>
        </form>

      </div>
    </div>
  );
}

export default ChatBox
