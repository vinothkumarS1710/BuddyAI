import { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { assets } from "../assets/assets";
import toast from 'react-hot-toast'

const Login = () => {

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { theme, axios, setToken } = useAppContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = state === "login" ? 'api/user/login' : 'api/user/register'

    try{
      const {data} = await axios.post(url, {name, email, password})
      if(data.success){
        setToken(data.token)
        console.log(setToken)
        localStorage.setItem('token', data.token)
      }else{
        toast.error(data.message)
      }
    }catch(err){
      toast.error(err.message)
    }
  }

  return (

    <div className="flex flex-col gap-4 m-auto p-8 items-center py-12 w-80 w-screen h-screen rounded-lg shadow-xl border border-sky-200 bg-white">
        <div className='flex items-center justify-center gap-4 dark:text-white text-2xl'>
                <div className='flex gap-2'>
                <img
                  src={assets.hello}
                  alt=""
                  className="w-8 h-8 my-1"
                />
                <h1 className='text-4xl text-gray-500'>Hi there</h1>
                </div>
        </div>
        <p className='text-sm bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-transparent'> Lets Start Your AI Journey With BuddyAI</p>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-8 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-sky-400 bg-white">
      <p className="text-2xl font-medium m-auto">
        <span className="bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-transparent">Kindly </span> {state === "login" ? " Login!" : " Sign Up!"}
      </p>
      {state === "register" && (
        <div className="w-full">
          <p>Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Your name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-sky-500" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="xyz@gmail.com" className="border border-gray-200 rounded w-full p-2 mt-1 outline-sky-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-sky-500" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-transparent cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-transparent cursor-pointer">click here</span>
                </p>
            )}
            <button type='submit' className="bg-gradient-to-r from-cyan-500 to-sky-600 hover:bg-sky-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    
    </div>
  )
}

export default Login
