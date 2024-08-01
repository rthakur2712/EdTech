import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operationa/auth';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const {loading} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }
  return (
    <div className='flex h-[70vh] items-center justify-center text-white'>
        {
            loading?<div className='loader'></div>:(
                <div className='flex flex-col w-[25%] gap-6'>
                <form className='flex flex-col gap-3 '
                onSubmit={submitHandler}
                >
                    <h1 className='text-richblack-5 text-xl font-bold '>{
                        emailSent?"Check email":"Reset your password"
                        }</h1>

                <p className='text-richblack-200'>
                    {emailSent?`We have sent the reset email to your ${email}`:"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}
                </p>
                {
                    !emailSent && (
                        <label className='mt-4 flex flex-col gap-1'>
                            <p className='text-richblack-200 text-sm flex gap-1'>Email Address <span className='text-pink-200'>*</span></p>
                            <input
                            name='email'
                            value={email}
                            type='email'
                            className='bg-richblack-800 px-3 py-1 w-full rounded-md'
                            placeholder='abc123@gmail.com'
                            onChange={(e)=>setEmail(e.target.value)}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                            />
                        </label>
                    )
                }
               
                <button  className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                type='submit'>
                    {
                        emailSent?"Resend email":"Reset Password"
                    }
                </button>
                </form>
                <Link to="/login">
                <div className='text-left text-white  w-fit text-sm flex items-center gap-2'>
                <FaArrowLeftLong />
                    Back to login
                </div>
                </Link>
                
                </div>
            

               
            )
        }
    </div>
  )
}
