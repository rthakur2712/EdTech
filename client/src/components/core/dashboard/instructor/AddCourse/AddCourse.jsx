import React from "react";
import RenderComponents from "./RenderComponents";
import { useSelector } from "react-redux";

export default function AddCourse() {
  const { editCourse } = useSelector((state) => state.course);
  return (
    <div className="flex  gap-10 mx-10 my-5">
      <div className="w-[650px] flex flex-col gap-4">
        <h1 className="text-3xl text-richblack-5">
          {editCourse ? "Edit Course" : "Add Course"}
        </h1>
        <RenderComponents />
      </div>
      <div className=" sticky top-10 self-start max-w-[350px] bg-richblack-800 p-6 flex gap-5 flex-col rounded-md h-fit ">
        <h2 className="text-lg text-richblack-5">Course Upload Tips</h2>
        <ul className=" list-item list-disc space-y-4 text-xs text-richblack-5">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons,quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on thecourse
            single page.
          </li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
}
