import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/operationa/auth';



export default function ConformationModal({ConformationModal,setComformModal}) {
  const dispatch = useDispatch();
  const navigate=useNavigate();

const logoutHandler = () => {
  dispatch(logout(navigate));
}
  return (
    <div className='text-white bg-richblack-900 w-[80%] flex flex-col gap-2 text-center mx-auto rounded-lg mt-2 px-4 py-2'>
      <div>Are you sure</div>
      <div className='text-xs text-richblack-300'>You will be logged out</div>
      <div className='flex gap-2'>
        <div className='text-center text-sm px-3 py-1 rounded-md font-bold bg-yellow-25 text-black cursor-pointer'
        onClick={logoutHandler}
        >Logout</div>
        <div className='text-center text-sm px-3 py-1 rounded-md font-bold bg-richblack-500 text-black cursor-pointer'
        onClick={()=>setComformModal(false)}
        >Cancel</div>
      </div>
    </div>
  )
}
