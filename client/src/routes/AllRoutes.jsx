import { Routes, Route, useLocation } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import Credits from '../pages/Credits'
import Community from "../pages/Community";
import Loading from "../pages/Loading";
import { useAppContext } from '../context/AppContext'

const AllRoutes = () => {

  const {pathname} = useLocation()

  const {loadingUser} = useAppContext()  

  if(pathname === '/loading' || loadingUser) return <Loading/>

  return (
    <Routes>
      <Route path="/" element={<ChatBox />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/community" element={<Community />} />
    </Routes>
  );
};

export default AllRoutes;
