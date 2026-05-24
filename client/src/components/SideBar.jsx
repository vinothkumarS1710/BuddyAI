import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from "../assets/assets"
import moment from 'moment'

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats, setSelectedChats, theme, setTheme, user, navigate } = useAppContext();
  const [search, setSearch] = useState("");

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl transition-all duration-500 max-md:absolute left-0 z-1 ${!isMenuOpen && "max-md:-translate-x-full"}`}
    >
      <div className='flex gap-4 dark:text-white text-2xl'>
        <div className='p-[1px] rounded-full bg-gradient-to-r from-sky-400 via-blue-500/50 to-white dark:to-black animate-pulse'>
        <img
          src={theme === "dark" ? assets.logo_dark : assets.logo}
          alt=""
          className="w-14 h-14 rounded-full object-cover"
        />
        </div>
        <div>
        <h1>BuddyAI</h1>
        <p className='text-xs py-1 font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent'>Intelligent AI Assistent</p>
        </div>
      </div>

      <button className="flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-sky-400 via-white-900/80 to-[#2c67f2] text-sm rounded-md cursor-pointer">
        <span className="mr-2 text-xl">+</span>New Chat
      </button>

      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
        <img src={assets.search_icon} className="w-4 not-dark:invert" alt="" />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Conversation"
          className="text-xs placeholder:text-gray-400 outline-none"
        />
      </div>

      {chats.length > 0 && <p className="mt-4 text-sm">Recent Chats</p>}
      <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0]?.content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((chat) => (
            <div
              onClick={() => {
                navigate("/");
                setSelectedChats(chat);
                setIsMenuOpen(false);
              }}
              key={chat._id}
              className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group"
            >
              <div>
                <p className="truncate w-full">
                  {chat.messages.length > 0
                    ? chat.messages[0].content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <img
                src={assets.bin_icon}
                className="hidden group-hover:block w-4 cursor-pointer not-dark:invert"
              />
            </div>
          ))}
      </div>

      <div
        onClick={() => {
          navigate("/community");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all"
      >
        <img src={assets.gallery_icon} className="w-4.5 not-dark:invert" />
        <div className="flex flex-col text-sm">
          <p>Community Images</p>
        </div>
      </div>

      <div
        onClick={() => {
          navigate("/credits");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all"
      >
        <img src={assets.diamond_icon} className="w-4.5 dark:invert" />
        <div className="flex flex-col text-sm">
          <p>Credits : {user?.credits}</p>
          <p className="text-xs text-gray-400">
            Purchase credits to use BuddyAI
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md">
        <div className="flex gap-2 text-sm">
          <img src={assets.theme_icon} className="w-4 not-dark:invert" />
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer">
          <input
            type="checkbox"
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="peer sr-only"
            checked={theme === "dark"}
          />
          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-blue-500 transition-all"></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>

      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
        <img src={assets.user_icon} className="w-5 rounded-full dark:invert" />
        <p className="flex-1 text-sm dark:text-sky-400 truncate">
          {user ? user.name : "Login your account"}
        </p>
        {user && (
          <img
            src={assets.logout_icon}
            className="h-5 cursor-pointer md:hidden not-dark:invert group-hover:block"
          />
        )}
      </div>
      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
        alt=""
      />
    </div>
  );
};

export default SideBar
