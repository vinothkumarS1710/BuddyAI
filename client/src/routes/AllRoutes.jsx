import { Routes, Route } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import Credits from '../pages/Credits'
import Community from "../pages/Community";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatBox />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/community" element={<Community />} />
    </Routes>
  );
};

export default AllRoutes;
