import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCart from "./CourseCart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../services/operationa/studentFeatures";

export default function Cart() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {cart}=useSelector((state)=>state.cart)
  const {user}=useSelector((state)=>state.profile)
  const {total}=useSelector((state)=>state.cart)
  const {token}=useSelector((state)=>state.auth)
  console.log("cart",cart)
  const handleBuyCourse=async()=>{
    if (!token) {
      toast.error("Please login or signup to buy course");
      navigate("/login");
      return;
    }
    const courses = cart.map((course) => course._id);
    // console.log("courses",courses)
    await buyCourse(token, courses, user, navigate, dispatch);
  }
  if(cart.length===0){
    return <div className="text-richblack-5 flex items-center justify-center h-[20vh]">Cart is empty</div>
  }
  return <div>
    <h1 className=" pr-[120px] pl-6 py-6 text-richblack-5 text-3xl">My Wishlist</h1>
    <div className="flex gap-5 border border-t-richblack-600 w-[85%]">
    <div className="py-6 flex flex-col gap-8 ">
      {
        cart.map((item,index)=>{
          return(
            <CourseCart course={item} key={index}/>
          )
        })
      }
      
    </div>
    <div className="p-6 bg-richblack-800 h-fit flex flex-col gap-2 rounded-lg border border-richblack-700 mt-6 ml-2 ">
        <h1 className="text-richblack-200 text-sm">Total:</h1>
        <div className="text-lg text-yellow-50">Rs. {total}</div>
        <div className="px-12 py-2 rounded-md bg-yellow-50 text-richblack-900 cursor-pointer"
        onClick={()=>handleBuyCourse()}
        >Buy Now</div>
      </div>
    </div>
   
  </div>
}
