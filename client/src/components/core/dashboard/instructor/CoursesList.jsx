import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
export default function CoursesList({course}) {
    console.log(course)
  return (
    <div className='flex flex-col gap-5'>
       {
        course&&course.map((item,index)=>{
            return (
                <div key={index} className=' p-2 flex items-center'>
                    <div className='flex gap-6 w-[60%] p-2'>
                    <img src={item.thumbnail} alt={item.courseName} className=' w-[200px] rounded-lg object-contain'/>
                    <div className='flex flex-col gap-2'>
                        <p className='text-richblack-5 text-xl'>{item.courseName}</p>
                        <p className='text-richblack-100 text-sm'>{item.courseDescription}</p>
                        <p className='text-richblack-5 text-xs'>{item.createdAt?<>{"Created:"}{item.createdAt}</>:<p>Created: April 27,2023 </p>}</p>
                    </div>
                    </div>
                    <div className='flex w-[40%] text-richblack-100 justify-between'>
                        <p>{item.duration}</p>
                        <p>{"$"}{item.price}</p>
                        <p className='flex gap-3 text-2xl'><MdEdit /><MdDelete /></p>
                    </div>
                </div>
            )
        })
       }
    </div>
  )
}
