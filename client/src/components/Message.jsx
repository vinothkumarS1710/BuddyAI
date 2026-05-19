import React from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'

const Message = ({ message }) => {
  
  return (
    <div>
      {message.role === "user" ? (
        <div className="flex justify-end items-start gap-2 my-4 w-full">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#573173]/30 border border-[#80609F]/30 rounded-md max-w-2xl">
            <p className="text-sm dark:text-primary">{message.content}</p>
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
        <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4">
          {message.isImage ? (
            <img
              src={message.content}
              className="w-full max-w-sm mt-2 rounded-md"
            />
          ) : (
            <div className="text-sm dark:text-primary reset-tw">
              {message.content}
            </div>
          )}
          <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  );
}

export default Message
