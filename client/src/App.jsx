import SideBar from './components/SideBar'
import AllRoutes from "./routes/AllRoutes"

const App = () => {
  return (
    <>
      <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
        <div className="flex h-screen w-screen">
          <SideBar />
          <AllRoutes/>
        </div>
      </div>
    </>
  );
}

export default App