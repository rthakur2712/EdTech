import React from 'react'
import { useState, useEffect } from 'react';
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../slices/cartSlice';

export default function CourseCart({course}) {
    const dispatch = useDispatch();
    const {cart} = useSelector((state) => state.cart);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
      const count = GetAvgRating(course.ratingAndReviews);
      setAvgReviewCount(count);
    }, [course]);
    const handleRemove = (course) => {
        // console.log("id",id)
       dispatch(removeFromCart(course));
    //    console.log("cart",cart)
    }
return (
    <div className="flex px-6 gap-5 border pb-8 border-b-richblack-600 w-[100%]">
            <img src={course.thumbnail} className="w-[185px] rounded-md" alt="thumbnail"/>
            <div className="w-[60%] flex flex-col gap-1">
                    <p className="text-richblack-5">{course.courseName}</p>
                    <p className="text-richblack-200">
                        {course.courseDescription.split(" ").slice(0, 8).join(" ")}...
                    </p>
                    <p className="text-richblack-500 text-sm">{course.instructor.firstName}{" "}{course.instructor.lastName}</p>

                    <p className="flex items-center gap-2">
                         <span className="text-yellow-50">{avgReviewCount || 0}</span>
                         <RatingStars Review_Count={avgReviewCount} />
                         <span className="text-richblack-400 text-sm">
                             {course?.ratingAndReviews?.length || 0} {"(Review Count)"}
                         </span>
                     </p>
                 
            </div>
            <div className="flex items-center gap-5 flex-col">
                <div className="cursor-pointer text-pink-300 flex items-center gap-2 py-2 px-1 bg-richblack-800 rounded-lg border border-richblack-700"
                onClick={()=>handleRemove(course)}
                > <MdDelete /> Remove</div>
                <div className="text-yellow-50">Rs. {course.price}</div>
            </div>
    </div>
)
}
