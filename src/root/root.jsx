import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import CoursePage from "../pages/Courses";
import LoginPage from "../pages/Login/login";
import TestPage from "../pages/test/Test";
import SolveTest from "../pages/solveTest/SolveTest";
import ChatOverlay from "../AI/ChatOverlay";
import Register from "../pages/register/Register";
import Coursehome from "../pages/coursehome/Coursehome";
import CertificatePage from "../pages/certificatePage/certificatePage";
import Admin from "../pages/admin/Admin";
import Blog from "../pages/blog/Blog";
import Aboutus from "../pages/about-us/AboutUs";
import Detail from "../pages/detail/Detail";



function Root() {
  return (
    <>
    <ChatOverlay/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/course/:id" element={<CoursePage/>} />
        <Route path="/courses" element={<Coursehome/>} />
        <Route path="/tests" element={<TestPage/>} />
        <Route path="/solve-test/:id" element={<SolveTest/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/certificate" element={<CertificatePage/>} />
        <Route path="/about-us" element={<Aboutus/>} />
        <Route path="/blogs" element={<Blog/>} />
        <Route path="/post/:id" element={<Detail />} />
        <Route path="/auth/admin" element={<Admin/>} />
        <Route path="*" element={<>Not Found</>} />
      </Routes>
      
    </>
  );
}

export default Root;
