import "./App.css";
import { Routes , Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-richblack-900 font-inter">
         <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
         </Routes>
    </div>
  
  );
}

export default App;
