import { Routes, Route, useLocation } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import Credits from '../pages/Credits'
import Community from "../pages/Community";
import Loading from "../pages/Loading";

const AllRoutes = () => {

  const {pathname} = useLocation()
  

  if(pathname === '/loading') return <Loading/>

  return (
    <Routes>
      <Route path="/" element={<ChatBox />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/community" element={<Community />} />
    </Routes>
  );
};

export default AllRoutes;
