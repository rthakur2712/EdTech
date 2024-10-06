import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

import { FaDesktop } from "react-icons/fa";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState(""); // store curr section id
  const [videoBarActive, setVideoBarActive] = useState(""); // store curr SubSection Id
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  console.log("completed lectures", completedLectures);
  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;
      // set current section and subsection
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div className="min-h-screen w-[320px] max-w-[350px] border-r-[1px] border-r-richblack-700  bg-richblack-800 flex flex-col gap-[10px] py-[30px]">
        {/* for buttons and headings */}
        <div className="flex flex-col gap-3 px-6">
          <div className="py-2 flex gap-2 items-center">
            <p className="text-richblack-25 text-xl font-bold">
              {courseEntireData?.courseName}
            </p>
            <p className="text-caribbeangreen-100 font-bold ">
              {completedLectures?.length}/{totalNoOfLectures}
            </p>
          </div>
          <div className="border-b border-richblack-600 pb-4">
            <div
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="text-richblack-300 underline cursor-pointer flex text-xs items-center absolute  left-0 top-[70px]"
            >
              <IoIosArrowBack size={20} />
              Back
            </div>
            <div
              className=" bg-yellow-50 py-3 px-6 w-fit rounded-lg cursor-pointer ml-2"
              onClick={() => setReviewModal(true)}
            >
              Add Review
            </div>
          </div>
        </div>
        {/* for section and subsection */}
        <div>
          {courseSectionData?.map((section, index) => (
            <div onClick={() => setActiveStatus(section._id)} key={index}>
              <div className="py-4 px-6 bg-richblack-700 text-richblack-5 rounded-sm mt-1">
                <div className="text-lg capitalize">{section?.sectionName}</div>
              </div>
              <div className="flex flex-col mt-2">
                {activeStatus === section._id &&
                  section.subSection.map((topic, index) => (
                    <div
                      key={index}
                      className={`${
                        topic._id === videoBarActive
                          ? "text-blue-100"
                          : " text-richblack-5"
                      } px-4 py-2 capitalize flex items-center text-sm rounded-sm  gap-1 ml-4 cursor-pointer`}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic._id}`
                        );
                        setVideoBarActive(topic?._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic._id)}
                        className="h-4 w-4  "
                        onChange={() => {}}
                      />
                      <span className=" flex gap-2 items-center">
                        {topic.title} <FaDesktop />
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
