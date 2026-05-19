import { useState } from 'react'
import SideBar from './components/SideBar'
import AllRoutes from "./routes/AllRoutes"
import { assets } from './assets/assets'
import './assets/prism.css'

const App = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert"
          onClick={() => setIsMenuOpen(true)}
        />
      )}
      <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
        <div className="flex h-screen w-screen">
          <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <AllRoutes />
        </div>
      </div>
    </>
  );
}

export default App