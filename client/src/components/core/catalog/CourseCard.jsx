import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating'
import RatingStars from '../../common/RatingStars'

export default function CourseCard({course,Height,width}) {
    const [avgReviewCount, setAvgReviewCount] = useState(0)
    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews)
        setAvgReviewCount(count)
      }, [course])
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
                   <div className='flex items-center gap-2'>
                    <span className='text-yellow-50'>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount} />
                    <span className="text-richblack-400 text-sm">
                {course?.ratingAndReviews?.length || 0} {"(Review Count)"}
              </span>
                   </div>
                    <p className='text-richblack-5'>Rs. {course.price}</p>
                </div>    
            </div>
        </Link>
    </div>
  )
}
