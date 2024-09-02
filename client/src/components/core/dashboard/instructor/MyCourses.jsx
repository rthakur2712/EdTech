import React, { useEffect, useState } from 'react'
import { getIntructorCourses } from '../../../../services/operationa/course';
import { useSelector } from 'react-redux';
import CoursesList from './CoursesList';

export default function MyCourses() {
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const [courses,setCourses]=useState(null);
    useEffect(() => {
       const fetchData = async () => {
        try {
          setLoading(true);
          const data = await getIntructorCourses(token);
          console.log("data",data);
          setCourses(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
       }
       fetchData();
    },[])
  return (
    <div className='mx-10 my-5'>
       <h1 className='text-richblack-5 text-3xl'>My Courses</h1>
       <div className='w-10/12 mx-4 my-10  '>
       <div className='text-richblack-100 flex text-sm  p-3 border-t border-l border-r font-semibold border-richblack-300 border-opacity-10'>
            <p className='w-[60%]'>COURSES</p>
            <div className='flex justify-between w-[25%] ml-10'>
            {/* <p className=''>DURATION</p> */}
            <p className=''>PRICE</p>
            <p className=''>ACTIONS</p>
            </div>
       </div>
       <div>
            <CoursesList courses={courses} loading={loading} setCourses={setCourses} />
       </div>
       </div>
      
    </div>
  )
}
