import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const ChatBox = () => {
  const {selectedChats, theme} = useAppContextntext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      if(selectedChats){
        setMessages(selectedChats.messages)
      }
  },[selectedChats])
  return (
    <div>
      ChatBox
    </div>
  )
}

export default ChatBox
