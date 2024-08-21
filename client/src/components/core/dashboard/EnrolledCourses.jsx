import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllEnrolledCourses } from '../../../services/operationa/profile';
import ProgressBar from "@ramonak/react-progress-bar";
export default function EnrolledCourses() {
  const [enrolledCourses,setEnrolledCourses]=useState(null);
  const {token}=useSelector((state)=>state.auth);
  const getEnrolledCourses=async()=>{
    try
    {
      const result= await getAllEnrolledCourses(token);
      // console.log("result",result);
    setEnrolledCourses(result);
    // console.log("enrolled courses",enrolledCourses)
  }catch(error){
    console.log("getEnrolledCourses error : ", error);
  }
  }
  useEffect(()=>{
    getEnrolledCourses();
  },[])
  // console.log("enrolled courses",enrolledCourses);
  if(!enrolledCourses){
    return <div className='flex justify-center items-center h-[80vh] w-[100%]'> <div className='loader '></div></div>
   
  }
  if(enrolledCourses.length===0){
    return <div className='text-richblack-5 font-bold mx-auto mt-20'>You are not enrolled in any course</div>
  }
  return (
    <div className='text-white'>
      <h1 className='p-6 text-3xl'>Enrolled Courses</h1>
      {/* heading bar */}
      <div className='w-[1100px] ml-6 border rounded-lg border-richblack-700'>
        <div className='flex  bg-richblack-700 rounded-t-lg text-richblack-50 text-sm'>
          <div className='p-4 w-[500px]'>Course Name</div>
          <div className='flex w-[600px]'>
          <div className='p-4 w-[300px]'>Duration</div>
          <div className='p-4'>Progress</div>
          </div>
         
        </div>
        <div>
          {enrolledCourses.map((course,index)=>(
            <div key={index} className='flex items-center border-t border-richblack-700'>
              <div className='flex items-center p-4 w-[500px] gap-5'>
                <img src={course.thumbnail} alt='thumbnail' className='w-12 h-12 object-cover rounded-lg'/>
                <div className='flex flex-col '>
                <p className='text-richblack-5'>{course.courseName}</p>
                <p className='text-richblack-300 text-sm'>{course.courseDescription}</p>
                </div>
                
              </div>
              <div className='w-[600px] flex items-center'>
              <div className='p-4 w-[300px] text-richblack-50'>{course.duration}</div>
              <div className='p-4 w-[300px]'>{course.progress? <ProgressBar
              completed={course.progress}
              height='8px'
              width='200px'
              isLabelVisible={false}
              />:
              <>
              <ProgressBar
              completed={10}
              height='8px'
              width='200px'
              isLabelVisible={false}
              />
              </>
                
                }</div>
              </div>
           
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
