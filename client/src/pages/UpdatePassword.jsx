import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operationa/auth";



export default function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = formData;
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    console.log("token",token)
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  }
  return (
    <div>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="text-white flex justify-center items-center h-[70vh]">
          <div className="w-[25%] flex flex-col gap-6">
            <div>
            <h1 className="text-richblack-5 text-xl font-bold">Choose new password</h1>
            <p className='text-richblack-200'>Almost done. Enter your new password and youre all set.</p>
            </div>
            <form className="flex flex-col gap-5"
            onSubmit={submitHandler}
            >
              <div className="relative">
                <label className="flex flex-col gap-3 ">
                  <p className="text-sm">
                    New Password <span className="text-pink-200">*</span>
                  </p>
                </label>
                <input
                  className="rounded-md py-2 bg-richblack-800 px-3 w-full"
                  placeholder="Password"
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
                <span
                  className="cursor-pointer absolute bottom-[20%] right-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              <div className="relative">
                <label className="flex flex-col gap-3 ">
                  <p className="text-sm">
                    Confirm New Password <span className="text-pink-200">*</span>
                  </p>
                </label>
                <input
                  className="rounded-md py-2 bg-richblack-800 px-3 w-full"
                  placeholder="Confirm Password"
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
                <span
                  className="cursor-pointer absolute bottom-[20%] right-2"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
               
              </div>
              <button
              type="submit"
                 className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full"
                >Reset Password</button>
            </form>
            <Link to="/login">
                <div className='text-left text-white  w-fit text-sm flex items-center gap-2'>
                <FaArrowLeftLong />
                    Back to login
                </div>
                </Link>
          </div>
        </div>
      )}
    </div>
  );
}
