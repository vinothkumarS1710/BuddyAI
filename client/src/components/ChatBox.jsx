import { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'
import toast from 'react-hot-toast'


const ChatBox = () => {
  
  const {selectedChats, theme, user, setUser, axios, token} = useAppContext()
  
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)
  const requestInProgress = useRef(false)
  const containerRef = useRef(null)

  const onSubmit = async (e) => {
    try{
      e.preventDefault()
      if (loading || !prompt.trim() || requestInProgress.current) return;
      requestInProgress.current = true;

      if(!user) return toast('Login to send message')
        setLoading(true)
      const promptCopy = prompt
      setPrompt('')
      setMessages(prev => [...prev, {role: 'user', content: promptCopy, timestamp: Date.now(), isImage: false}])

      const {data} = await axios.post(`/api/message/${mode}`, {chatId: selectedChats._id, prompt: promptCopy, isPublished}, {headers: {Authorization: token}})

      if(data.success){
        setMessages(prev => [...prev, data.reply])

        if(mode === 'image'){
          setUser(prev => ({...prev, credits: prev.credits-2}))
        }else{
          setUser(prev => ({...prev, credits: prev.credits-1}))
        }
      }else{
        toast.error(data.message)
        setPrompt(promptCopy)
      }

    }catch(err){
      toast.error(err.response?.data?.message || err.message || "Something went wrong")
    }finally{
      requestInProgress.current = false
      setPrompt('')
      setLoading(false)
    }
  }

  useEffect(() => {
      if(selectedChats){
        setMessages(selectedChats.messages)
      }
  },[selectedChats])

  useEffect(() => {
  if (containerRef.current) {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
},[messages]);

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      <div ref={containerRef} className="flex-1 mb-5 overflow-y-scroll">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-primary">
            <div className='flex gap-5 items-center justify-start dark:text-white text-black text-2xl dark:text-white'>
                    <div className='p-[1px] w-11 h-11 rounded-full bg-gradient-to-r from-sky-400 via-blue-500/50 to-white dark:to-black animate-pulse'>
                    <img
                      src={theme === "dark" ? assets.logo_dark : assets.logo}
                      alt=""
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    </div>
                    <div>
                    <h1 className='tracking-tight'>BuddyAI</h1>
                    <p className=' py-1 text-xs tracking-wide bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent font-semibold'>Intelligent AI Assistent</p>
                    </div>
                  </div>
            <p className="mt-5 text-2xl text-center text-gray-400 dark:text-white">
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

      </div>
        
        {mode === 'image' && (
          <div className='flex justify-center'>
              <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
                <p className='text-xs'>Publish Generated Image to Community</p>
                <input type="checkbox" className='cursor-pointer' checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)}/>
              </label>
          </div>
        )}
        
        <form onSubmit={onSubmit} className='bg-sky-200/30 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full p-3 pl-4 max-auto flex gap-4 items-center '>
          <select className='text-sm pl-3 pr-2 outline-none' onChange={(e) => setMode(e.target.value)} value={mode}>
            <option value="text" className='dark:bg-blue-400'>Text</option>
            <option value="image" className='dark:bg-blue-400'>Image</option>
          </select>
          <input type="text" onChange={(e) => setPrompt(e.target.value)} value={prompt} placeholder='Type your prompt here...' className='flex-1 w-full text-sm outline-none' required/>
          <button disabled={loading} type="submit">
            <img src={loading ? assets.stop_icon : assets.send_icon} alt="" className='w-8 cursor-pointer'/>
          </button>
        </form>
    </div>
  );
}

export default ChatBox
