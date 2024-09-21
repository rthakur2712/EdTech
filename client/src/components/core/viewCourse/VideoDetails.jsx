import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { Player } from "video-react";
// import "video-react/dist/video-react.css";
import ReactPlayer from "react-player";

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  useEffect(() => {
    const videoSpecificDetails = async () => {
      if (!courseSectionData.length === 0) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filterData = courseSectionData.filter(
          (data) => data._id === sectionId
        );
        console.log("filterData", filterData);
        const filterVideoData = filterData[0].subSection.filter(
          (data) => data._id === subSectionId
        );
        setVideoData(filterVideoData[0]);
        setVideoEnded(false);
      }
    };
    videoSpecificDetails();
    // console.log("videoData",videoData)
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);
  const isFirstVideo = () => {
    const currSectionId = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currSubSectionId = courseSectionData[
      currSectionId
    ].subSection.findIndex((data) => data._id === subSectionId);
    if (currSectionId === 0 && currSubSectionId === 0) {
      return true;
    } else {
      return false;
    }
  };
  const isLastVideo = () => {
    const currSectionId = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currSubSectionId = courseSectionData[
      currSectionId
    ].subSection.findIndex((data) => data._id === subSectionId);
    const totalNoOfLectures =
      courseSectionData[currSectionId].subSection.length;
    if (
      currSectionId === courseSectionData.length - 1 &&
      currSubSectionId === totalNoOfLectures - 1
    ) {
      return true;
    } else {
      return false;
    }
  };
  const goToNextVideo = () => {
    const currSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currSubSectionIndex = courseSectionData[
      currSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);
    const totalNoOfLectures =
      courseSectionData[currSectionIndex].subSection.length;
    if (currSubSectionIndex < totalNoOfLectures - 1) {
      // isi section me next video hai
      const nextSubSectionId =
        courseSectionData[currSectionIndex].subSection[currSubSectionIndex + 1]
          ._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // next section me video hai
      const nextSectionId = courseSectionData[currSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[nextSectionId].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };
  const goToPrevVideo = () => {
    const currSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currSubSectionIndex = courseSectionData[
      currSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);
    if (currSubSectionIndex > 0) {
      // isi section me prev video hai
      const prevSubSectionId =
        courseSectionData[currSectionIndex].subSection[currSubSectionIndex - 1]
          ._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      // prev section me video hai
      const prevSectionId = courseSectionData[currSectionIndex - 1]._id;
      const prevSubSectionId =
        courseSectionData[prevSectionId].subSection[
          courseSectionData[prevSectionId].subSection.length - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };
  const handleLectureCompletion = async () => {
    // dummy
  };
  if (!videoData) {
    return <div className="text-white">No data found</div>;
  }
  console.log("videoData", videoData);
  return (
    <div className="text-white">
      <div className="w-[80vw] relative">
        <ReactPlayer
          className="react-player"
          ref={playerRef}
          url={videoData?.videoUrl}
          width="100%"
          height="100%"
          controls={true}
          playing={true}
          onEnded={() => setVideoEnded(true)}
        />
        <div>
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <button
                  // disabled={loading}
                  onclick={() => handleLectureCompletion()}
                  className="text-xl max-w-max px-4 mx-auto py-1  bg-richblack-100 text-richblack-900 rounded-lg mb-2 "
                >
                  Mark As Completed
                </button>
              )}

              <button
                // disabled={loading}
                onClick={() => {
                  if (playerRef?.current) {
                  // set the current time of the video to 0
                  playerRef?.current?.seekTo(0);
                  setVideoEnded(false);
                  }
                }}
                className="text-xl max-w-max px-4 py-1 mx-auto mt-2  bg-richblack-100 text-richblack-900 rounded-lg"
                >
                Rewatch
                </button>

                <div className="mt-5 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    // disabled={loading}
                    onClick={goToPrevVideo}
                    className="text-xl max-w-max px-4 py-1 mx-auto mt-2  bg-richblack-100 text-richblack-900 rounded-lg"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    // disabled={loading}
                    onClick={goToNextVideo}
                    className="text-xl max-w-max px-4 py-1 mx-auto mt-2  bg-richblack-100 text-richblack-900 rounded-lg"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="ml-5 mt-2 flex flex-col gap-1">
        <h1 className="text-2xl">{videoData.title}</h1>
        <p className="w-[70%] text-sm text-richblack-100">
          {videoData.description}
        </p>
      </div>
    </div>
  );
}
