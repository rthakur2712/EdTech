import React from 'react'
import { useSelector } from 'react-redux'
import EditBTN from '../profile/EditBTN'
import { Link } from 'react-router-dom'

export default function MyProfile() {
    const {user}=useSelector((state)=>state.profile)
   if(!user){
       return <div className='loader'></div>
   }
    // console.log("user",user)
    
  return (
    <div className='pt-6 px-6'>
        <h1 className='text-richblack-5 text-3xl '>My Profile</h1>
        <div className='flex mt-10 ml-20'>
        <div className='w-[792px] flex flex-col gap-11'>
            {/* section 1 name image and email */}
            <div className='bg-richblack-800 flex p-6 items-center justify-between rounded-lg'>
                <div className='flex gap-6 items-center'>
                <img src={  user.image} alt='user'
                className='w-[78px] h-[78px] rounded-full object-cover'
                />
                <div className='text-richblack-5'>
                    <h1 className='text-lg '>{ user.firstName}{" "}{ user.lastName}</h1>
                    <p className='text-sm text-richblack-300'>{user.email}</p>
                </div>
                </div>
               <Link to={'/dashboard/settings'}>
               <EditBTN/>
               </Link>
                
            </div>
            {/* section 2 details containing email id and phone number */}
            <div className='p-6 bg-richblack-800 flex flex-col gap-5 rounded-lg text-richblack-5'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg'>Personal Details</h1>
                    <Link to={'/dashboard/settings'}>
               <EditBTN/>
               </Link>
                </div>
                <div className='flex gap-10 '>
                    <div className='w-[50%]'>
                        <p className='text-sm text-richblack-600'>First Name</p>
                        <p className='text-sm'>{user.firstName}</p>
                    </div>
                    <div>
                        <p className='text-sm text-richblack-600'>Last Name</p>
                        <p className='text-sm'>{user.lastName}</p>
                    </div>
                </div>
                <div className='flex gap-10'>
                    <div className='w-[50%]'>
                        <p className='text-sm text-richblack-600'>Email</p>
                        <p className='text-sm'>{user.email}</p>
                    </div>
                    <div>
                        <p className='text-sm text-richblack-600'>Phone Number</p>
                        <p className='text-sm '>{user.additionalDetails.contactNumber?user.additionalDetails.contactNumber:"Add Contact Number..."}</p>
                    </div>
                </div>
                <div className='flex gap-10'>
                    <div className='w-[50%]'>
                        <p className='text-sm text-richblack-600'>Date Of Birth</p>
                        <p className='text-sm'>{user.additionalDetails.dateOfBirth?user.additionalDetails.dateOfBirth:"Add your dob..."}</p>
                    </div>
                    <div>
                        <p className='text-sm text-richblack-600'>Gender</p>
                        <p className='text-sm '>{user.additionalDetails.gender?user.additionalDetails.gender:"Gender..."}</p>
                    </div>
                </div>
                <div>
                    <p className='text-sm text-richblack-600'>About</p>
                    <p className='text-sm'>{user.additionalDetails.about?user.additionalDetails.about:"Write something about you..."}</p>
                </div>
                
            </div>
        </div>
        </div>
     
    </div>
  )
}
