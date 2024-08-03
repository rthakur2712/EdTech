import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { sendOTP, signup } from '../services/operationa/auth';


export default function VerifyEmail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,signupData } = useSelector(state => state.auth);
    const [otp, setOtp] = useState("");
    const { firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType}=signupData;
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate));
    }
    const resendHandler = ()=>{
        dispatch(sendOTP(email,navigate));
    }
    useEffect(() => {
        if(!signupData){
            navigate('/signup')
        }
    },[])
  return (
    <div className='flex justify-center items-center h-[70vh]'>
        {
            loading?<div className='loader'></div>:
            <div className='text-white flex justify-center items-center h-[70vh]'>
                <div className='flex flex-col w-[75%] gap-6'>
                <h1 className='text-3xl'>Verify email</h1>
                <p className='text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
                <form
                onSubmit={submitHandler}
                >
                    <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                   
                    renderInput={(props) => <input {...props} 
                    className='!w-[50px] h-[44px] bg-richblack-800 text-richblack-5 rounded-md text-center '
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      placeholder='-'
                    />}
                    containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                      }}
                    
                    />
                    <button
                    type='submit'
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full"
                    
                    >Verify email</button>
                </form>
                <div className='flex justify-between'>
                <Link to="/login">
                <div className='text-left text-white  w-fit text-sm flex items-center gap-2'>
                <FaArrowLeftLong />
                    Back to login
                </div>
                </Link>
                
                <div className='flex items-center gap-1 text-blue-100 cursor-pointer'
                onClick={resendHandler}
                >
                <IoMdTime />
                Resend it
                </div>
                </div>
                </div>
               
            </div>
        }
    </div>
  )
}
