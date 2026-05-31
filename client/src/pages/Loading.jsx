import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'


const Loading = () => {

  const navigate = useNavigate()
  const {fetchUser} = useAppContext()

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUser()
      navigate('/')
    },8000)
    return () => clearTimeout(timeout)
  },[])

  return (
    <div className='bg-gradient-to-b from-sky-400 via-white-800/80 to-[#2c67f2] backdrop-opacity-60 flex items-center justify-center h-screen w-screen text-white text-2xl gap-2'>
      <h3 className='text-white'>Loading</h3>
      <div className='w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}

export default Loading
