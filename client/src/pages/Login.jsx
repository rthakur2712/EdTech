import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import loginImg from '../assets/Images/login.webp'
import ItalicText from '../components/core/login/ItalicText'
import frameImg from '../assets/Images/frame.png' 
import { toast } from 'react-hot-toast'
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = formData;
    const handleOnChange = (e) => {
        setFormData((prev) => ({
             ...prev,
             [e.target.name]: e.target.value,
         }));
    }
    const submitHandler = (e) => {
      e.preventDefault();
      const { email, password } = formData;
      if (!email || !password) {
        toast.error("Please fill all the fields");
        return;
      }
      console.log(formData);
      setFormData({
          email: "",
          password: ""
      })
    }
  return (
    <div className='text-white flex items-center mx-auto justify-around mt-20'>


        <form className='flex flex-col w-[40%] p-8 gap-9' onSubmit={submitHandler}>
            <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-semibold'>Welcome Back</h2>
                <p className='text-richblack-100 '>Build skills for today, tomorrow, and beyond. <ItalicText text={'Education to future-proof your career.'}/>.</p>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-[6px]'>
                    <label className='flex gap-[2px]' >Email<span className='text-pink-200'>*</span></label>
                    <input type='email' placeholder='Enter email address' className='bg-richblack-800 p-3 rounded-md'
                     style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      name='email'
                      value={email}
                      onChange={handleOnChange}
                      />
                </div>
                <div className='flex flex-col gap-[6px] relative'>
                    <label className='flex gap-[2px]'>Password<span className='text-pink-200'>*</span></label>
                    <div className='flex flex-col gap-[2px]'>
                    <input type={`${showPassword?"text":"password"}`} placeholder='Enter password' className='bg-richblack-800 p-3 rounded-md' 
                     style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      name='password'
                      value={password}
                      onChange={handleOnChange}
                      />
                      <span onClick={()=>setShowPassword((prev)=>!prev)} className='cursor-pointer absolute bottom-[35%] right-3'>
                        {
                            showPassword?<AiOutlineEyeInvisible/>:<AiOutlineEye/>
                        }
                      </span>
                      <span className='flex justify-end text-xs text-blue-100'>Forgot password</span>
                    </div>
                   
                </div>
            </div>
            <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
        </form>
        <div className='w-[40%] relative '>
            <img src={frameImg} alt='frame' />
            <img src={loginImg} alt='loginImg' className=' absolute -top-4 right-4' />
        </div>
    </div>
  )
}
