import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tokenLogin } from "./services/operationa/auth";
import MyProfile from "./components/core/dashboard/MyProfile";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import PurchaseHistory from "./components/core/dashboard/PurchaseHistory";
import Settings from "./components/core/dashboard/Settings";
import Cart from "./components/core/dashboard/Cart";
import MyCourses from "./components/core/dashboard/instructor/MyCourses";
// import AddCourse from "./components/core/dashboard/instructor/AddCourse";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(tokenLogin());
    }
  }, []);
  return (
    <div className="flex flex-col w-screen min-h-screen bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<Dashboard />}>
          <Route
            path="/dashboard/enrolled-courses"
            element={<EnrolledCourses />}
          />
          <Route path="/dashboard/my-profile" 
                 element={<MyProfile />} />
          <Route
            path="/dashboard/purchase-history"
            element={<PurchaseHistory />}
          />
          <Route 
            path="/dashboard/my-courses"
            element={<MyCourses/>}
            />
            {/* <Route path="/dashboard/add-course" element={<AddCourse/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/> */}
          <Route path="/dashboard/cart" element={<Cart/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
