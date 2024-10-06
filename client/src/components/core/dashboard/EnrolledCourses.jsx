import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllEnrolledCourses } from "../../../services/operationa/profile";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
export default function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const getEnrolledCourses = async () => {
    try {
      const result = await getAllEnrolledCourses(token);
      // console.log("result",result);
      setEnrolledCourses(result);
      // console.log("enrolled courses",enrolledCourses)
    } catch (error) {
      console.log("getEnrolledCourses error : ", error);
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);
  // console.log("enrolled courses",enrolledCourses);
  if (!enrolledCourses) {
    return (
      <div className="flex justify-center items-center h-[80vh] w-[100%]">
        {" "}
        <div className="loader "></div>
      </div>
    );
  }
  if (enrolledCourses.length === 0) {
    return (
      <div className="text-richblack-5 font-bold mx-auto mt-20">
        You are not enrolled in any course
      </div>
    );
  }
  return (
    <div className="text-white">
      <h1 className="py-6 lg:px-6 px-3 text-3xl">Enrolled Courses</h1>
      {/* heading bar */}
      <div className="lg:w-[1100px] md:w-[780px] w-[400px] lg:ml-6 ml-3  border rounded-lg border-richblack-700">
        <div className="flex  bg-richblack-700 rounded-t-lg text-richblack-50 text-sm">
          <div className="p-4 w-[500px]">Course Name</div>
          <div className="flex w-[600px] justify-center">
            {/* <div className='p-4 w-[300px]'>Duration</div> */}
            <div className="p-4 lg:flex md:flex hidden">Progress</div>
          </div>
        </div>
        <div>
          {enrolledCourses.map((course, index) => (
            // console.log("course", course),
            <div
              key={index}
              className="flex items-center border-t border-richblack-700"
              onClick={() => {
                navigate(
                  `/view-course/${course._id}/section/${course.sections?.[0]?._id}/sub-section/${course.sections?.[0]?.subSection?.[0]?._id}`
                );
              }}
            >
              <div className="flex items-center p-4 lg:w-[500px] w-[100%] gap-5">
                <img
                  src={course.thumbnail}
                  alt="thumbnail"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex flex-col  ">
                  <p className="text-richblack-5">{course.courseName}</p>
                  <p className="text-richblack-300 text-sm lg:block hidden">
                    {course.courseDescription.split(" ").slice(0, 20).join(" ")}
                    ...
                  </p>
                  <p className="text-richblack-300 text-sm ">
                    {course.courseDescription.split(" ").slice(0, 10).join(" ")}
                    ...
                  </p>
                </div>
              </div>
              <div className="w-[600px] lg:flex items-center justify-center md:flex hidden">
                {/* <div className='p-4 w-[300px] text-richblack-50'>{course.duration}</div> */}
                <div className="py-4 px-10 w-[300px]">
                  {course.progressPercentage ? (
                    <ProgressBar
                      completed={course.progressPercentage}
                      height="8px"
                      width="200px"
                      isLabelVisible={false}
                    />
                  ) : (
                    <>
                      <ProgressBar
                        completed={0}
                        height="8px"
                        width="200px"
                        isLabelVisible={false}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
