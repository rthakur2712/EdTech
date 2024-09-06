import React from 'react'
import { Link } from 'react-router-dom'

export default function CourseCard({course,Height,width}) {
  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div className='flex flex-col gap-5'>
                <div>
                    <img src={course.thumbnail} alt=""  className={`${Height} ${width} object-fit rounded-lg`}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-richblack-5'>{course.courseName}</p>
                    <p className='text-richblack-300 text-sm'>{course.instructor.firstName} {course.instructor.lastName}</p>
                    <p>Rating and average rating</p>
                    <p className='text-richblack-5'>Rs. {course.price}</p>
                </div>    
            </div>
        </Link>
    </div>
  )
}
