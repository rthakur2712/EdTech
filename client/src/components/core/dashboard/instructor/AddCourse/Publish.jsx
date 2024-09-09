import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_STATUS } from "../../../../../data/dashboard-links";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operationa/course";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function Publish() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };
  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses();
      return;
    }
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);
    setLoading(true);
    const result = await editCourseDetails(formData, token);
    if (result) {
      goToCourses();
    }
    setLoading(false);
  };
  const onSubmit = (data) => {
    handleCoursePublish();
  };

  return (
    <div className="w-[665px] bg-richblack-800 p-6 text-richblack-5 rounded-md flex gap-6 flex-col">
      <div className="text-2xl">Publish Settings</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 ml-5"
      >
        <label className="text-richblack-400 flex gap-2 text-sm">
          <input
            type="checkbox"
            //  className="border-richblack-300-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            {...register("public")}
          />
          <span>Make this Course Public</span>
        </label>
        <div className="flex gap-5">
          <button
            onClick={() => goBack()}
            className="bg-richblack-800 outline outline-richblack-700 w-fit px-6 py-3 rounded-md flex items-center gap-1 text-richblack-100"
          >
            <MdKeyboardArrowLeft />
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="py-3 rounded-md px-6 bg-yellow-50 text-richblack-900"
          >
            Finish
          </button>
        </div>
      </form>
    </div>
  );
}
