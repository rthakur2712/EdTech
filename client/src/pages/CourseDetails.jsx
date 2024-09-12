import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operationa/studentFeatures";
import { getCourseDetails } from "../services/operationa/course";
import GetAvgRating from "../utils/avgRating";
import RatingStars from "../components/common/RatingStars";
import { IoIosTimer, IoMdInformationCircleOutline } from "react-icons/io";
import { FiGlobe } from "react-icons/fi";
import { FaArrowPointer } from "react-icons/fa6";
import { CiMobile1 } from "react-icons/ci";
import { GrCertificate } from "react-icons/gr";
import Footer from "../components/common/Footer";
import CourseAccordion from "../components/core/catalog/CourseAccordion";

export default function CourseDetails() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const handleBuyCourse = () => {
    if (!token) {
      toast.error("Please login or signup to buy course");
      navigate("/login");
      return;
    }
    buyCourse(token, [courseId], user, navigate, dispatch);
    return;
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await getCourseDetails(courseId);
        console.log(res);
        setCourse(res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  console.log("course", course);
  if (!course)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <div className="loader"></div>
      </div>
    );
  return (
    <div>
      {/* <button
        className="bg-yellow-50 p-3 rounded-lg text-richblack-900"
        onClick={() => handleBuyCourse()}
      >
        Buy Now
      </button> */}
      <div className="px-[120px] py-8 bg-richblack-800 relative">
        <div className="w-[60%] flex flex-col gap-3">
          <div className="text-richblack-300 text-sm">
            {"Home  /  Catalog  /  "}
            <span className="text-yellow-50">{course.category.name}</span>
          </div>
          <div className="text-3xl text-richblack-5">{course.courseName}</div>
          <div className="text-sm text-richblack-200">
            {course.courseDescription}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-yellow-50">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-25 text-sm">
              {course?.ratingAndReviews?.length || 0} {"(Review Count)"}
            </span>
            <span className="text-richblack-25 text-sm flex items-center">
              {course.studentsEnrolled.length} Students Enrolled
            </span>
          </div>
          <div className="text-richblack-25">
            Created By {course?.instructor.firstName}{" "}
            {course?.instructor.lastName}
          </div>
          <div className="flex text-richblack-25 gap-2 items-center">
            <IoMdInformationCircleOutline />
            <span className="text-richblack-25  ">
              {course.createdAt ? (
                `Created: ${new Date(course.createdAt).toLocaleString()}`
              ) : (
                <span>Created: April 27, 2023</span>
              )}
            </span>
            <span className="flex items-center gap-2 ml-2">
              <FiGlobe />
              English
            </span>
          </div>
        </div>
        <div className="bg-richblack-700 w-[370px] rounded-lg absolute top-8 right-[120px]">
          <img
            src={course.thumbnail}
            alt=""
            className="h-[210px] w-[370px] object-cover rounded-t-lg"
          />
          <div className="p-6 flex flex-col gap-4">
            <div className="text-3xl text-richblack-5 font-bold">
              Rs. {course.price}
            </div>
            <div className="flex flex-col gap-3">
              <button
                className="bg-yellow-50 p-3 rounded-lg text-richblack-900"
                onClick={() => handleBuyCourse()}
              >
                Buy Now
              </button>
              <button className="bg-richblack-800 p-3 rounded-lg text-richblack-25">
                Add to Cart
              </button>
              <div className="text-sm text-richblack-25 mx-auto font-thin">
                30-Day Money-Back Guarantee
              </div>
            </div>
            <div className="">
              <p className="text-richblack-5 mb-2">This course includes:</p>
              <ul className="text-caribbeangreen-100 text-sm flex flex-col gap-2">
                <li className="flex gap-2 items-center">
                  <IoIosTimer />8 hours on-demand video
                </li>
                <li className="flex gap-2 items-center">
                  <FaArrowPointer />
                  Full Lifetime access
                </li>
                <li className="flex gap-2 items-center">
                  <CiMobile1 />
                  Access on Mobile and TV
                </li>
                <li className="flex gap-2 items-center">
                  <GrCertificate />
                  Certificate of completion
                </li>
              </ul>
            </div>
            <div className="text-yellow-100 mx-auto mt-2">Share</div>
          </div>
        </div>
      </div>
      <div className="px-[120px] mt-8 w-[70%] flex flex-col gap-8">
        <div className="p-8 border border-richblack-700 flex flex-col gap-3">
          <h1 className="text-3xl text-richblack-5">What you'll learn</h1>
          <div className="text-sm text-richblack-50 w-[70%] leading-7">
            {course.whatWillYouLearn}
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl text-richblack-5">Course Content</h1>
            <div className="flex justify-between items-center">
              <div className="text-richblack-50 text-sm">
                {course.sections.length} Sections •{" "}
                {course.sections.reduce(
                  (total, section) => total + section.subSection.length,
                  0
                )}{" "}
                lectures
              </div>
              <div className="text-sm text-yellow-50">
                Collapse all sections
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="py-4 ">
              {course.sections?.map((course, index) => (
                <CourseAccordion
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div> */}

      {/* <Footer/> */}
    </div>
  );
}
