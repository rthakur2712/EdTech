import React, { useState } from "react";
import ItalicText from "../components/core/login/ItalicText";
import signupImage from "../assets/Images/signup.webp";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import frameImg from "../assets/Images/frame.png";
import { toast } from "react-hot-toast";
import { setSignupData } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { sendOTP } from "../services/operationa/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [accountType, setAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {loading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    const signupData = {
      ...formData,
      accountType,
    };
    console.log(signupData);
    // setting signup data to state
    // so that it can be used after otp verification
    dispatch(setSignupData(signupData));
    // calling the send otp function to send otp
    dispatch(sendOTP(formData.email, navigate));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType("Student");
  
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
    {
      loading?<div className='loader'></div>:
      <div className="flex mx-auto mt-20 items-center justify-around ">
      <div className="flex flex-col gap-9 text-white w-[30%] ">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-semibold text-white">
            Join the millions learning to code with StudyNotion for free
          </h2>
          <p className="text-richblack-100 ">
            Build skills for today, tomorrow, and beyond.{" "}
            <ItalicText text={"Education to future-proof your career."} />.
          </p>
        </div>
        <div className="text-richblack-200 bg-richblack-800 w-fit p-1 rounded-full flex flex-row gap-[5px]">
          <button
            type="radio"
            className={`py-[6px] px-[18px] rounded-full ${
              accountType === "Student" ? "bg-richblack-900 text-white" : ""
            }`}
            onClick={() => setAccountType("Student")}
          >
            Student
          </button>
          <button
            type="radio"
            className={`1py-[6px] px-[18px] rounded-full ${
              accountType === "Instructor" ? "bg-richblack-900 text-white" : ""
            }`}
            onClick={() => setAccountType("Instructor")}
          >
            Instructors
          </button>
        </div>
        <form className="flex flex-col gap-9" onSubmit={submitHandler}>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between ">
              <label className="flex flex-col gap-[6px]">
                <p className="text-sm">
                  First Name <span className="text-pink-200">*</span>
                </p>
                <input
                  className="rounded-md px-3 py-2 bg-richblack-800"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleOnChange}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </label>
              <label className="flex flex-col gap-[6px]">
                <p className="text-sm">
                  Last Name <span className="text-pink-200">*</span>
                </p>
                <input
                  className="rounded-md p-3 py-2 bg-richblack-800"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleOnChange}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </label>
            </div>
            <label className="flex flex-col gap-[6px]">
              <p className="text-sm">
                Email Adrress <span className="text-pink-200">*</span>
              </p>
              <input
                className="rounded-md w-full bg-richblack-800 p-3 py-2"
                placeholder="Enter Email Address"
                name="email"
                value={email}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />
            </label>
            <div className="flex justify-between ">
              <div className="relative flex flex-col gap-[6px]">
                <label className="flex flex-col gap-[6px] ">
                  <p className="text-sm">
                    Password <span className="text-pink-200">*</span>
                  </p>
                </label>
                <input
                  className="rounded-md py-2 bg-richblack-800 px-3"
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

              <div className="relative flex flex-col gap-[6px]">
                <label className="flex flex-col gap-[6px] ">
                  <p className="text-sm">
                    Confirm Password <span className="text-pink-200">*</span>
                  </p>
                </label>
                <input
                  className="rounded-md py-2 bg-richblack-800 px-3"
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
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Sign up
          </button>
        </form>
      </div>

      <div className="w-[30%] relative">
        <img
          src={signupImage}
          alt="sinupImg"
          className="absolute bottom-4 right-4"
        />
        <img src={frameImg} alt="frame" />
      </div>
    </div>
    }
    </div>
   
  );
}
