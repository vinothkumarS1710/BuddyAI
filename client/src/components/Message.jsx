import { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import { useAppContext } from '../context/AppContext'

const Message = ({ message }) => {

  const { theme } = useAppContext()

  useEffect(() => {
    Prism.highlightAll()
  },[message.content])
  
  return (
    <div>
      {message.role === "user" ? (
        <div className="flex justify-end items-start gap-2 my-4 w-full">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#573173]/30 border border-[#80609F]/30 rounded-md max-w-2xl">
            <p className="text-sm dark:text-white">{message.content}</p>
            <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <img
            src={assets.user_icon}
            alt="user"
            className="w-7 rounded-full dark:invert"
          />
        </div>
      ) : (
        <div className="flex items-start gap-2 my-4 w-full">
          <img
            src={theme === 'dark' ? assets.logo_dark : assets.logo}
            alt="user"
            className="w-7 rounded-full mt-5 border-2 border-sky-400"
          />
          <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-sky-300/30 dark:bg-[#2c67f2]/30 border border-[#80609F]/30 rounded-md my-4">
            {message.isImage ? (
              <img
                src={message.content}
                className="w-full max-w-sm mt-2 rounded-md"
              />
            ) : (
              <div className="text-sm dark:text-white reset-tw">
                <Markdown>{message.content}</Markdown>
              </div>
            )}
            <span className="flex text-xs text-gray-400 dark:text-[#B1A6C0]">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message
