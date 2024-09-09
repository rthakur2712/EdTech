import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import IconBtn from "../../../../common/IconBtn";
import { CiCirclePlus } from "react-icons/ci";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operationa/course";
import NestedView from "./NestedView";

export default function CourseBuilder() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [editSectionName, setEditSectionName] = useState(null); // stored section ID

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };
  const goNext = () => {
    if (course.sections.length === 0) {
      toast.error("Add a section to continue");
      return;
    }
    if (course.sections.some((section) => section.subSection.length === 0)) {
      toast.error("Add atleast one Lecture to each Section");
      return;
    }
    dispatch(setStep(3));
  };
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };
  const onSubmit = async (data) => {
    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
          sectionId: editSectionName,
        },
        token
      );
      if (result) {
        dispatch(setCourse(result));
      }
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
      if (result) {
        // console.log("result",result)
        // toast.success("Section Created")
        dispatch(setCourse(result));
        dispatch(setEditCourse(true));
        setValue("sectionName", "");
        setEditSectionName(null);
      }
    }
  };
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };
  return (
    <div className="text-richblack-5 bg-richblack-800 p-6 rounded-lg flex flex-col gap-6 ">
      <p className="text-3xl">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4">
          {/* <label className="text-2xl">Section Name</label> */}
          <input
            type="text"
            placeholder="Add a Section to build your Course"
            className="bg-richblack-700 p-3 rounded-md"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            {...register("sectionName", { required: true })}
          />
          {errors.sectioinName && <span>Sectioin Name is Required</span>}
        </div>
        <div className="flex items-center gap-4 text-richblack-50">
          <button
            type="submit"
            className="py-3 px-4 outline rounded-lg text-yellow-50 outline-yellow-50  "
          >
            {!editSectionName ? (
              <div className="flex items-center gap-2">
                <CiCirclePlus />
                <span>Create Section</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CiCirclePlus />
                Edit Section Name
              </div>
            )}
          </button>
          {editSectionName && (
            <div className="underline" onClick={cancelEdit}>
              Cancel Edit
            </div>
          )}
        </div>
      </form>
      {course.sections.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      <div className="flex flex-row-reverse justify-start gap-4">
        <button
          className="bg-yellow-50 w-fit px-6 py-3 rounded-md flex items-center gap-1 text-richblack-900"
          onClick={goNext}
        >
          Next
          <MdKeyboardArrowRight />
        </button>
        <button
          className="bg-richblack-800 outline outline-richblack-700 w-fit px-6 py-3 rounded-md flex items-center gap-1 text-richblack-100"
          onClick={goBack}
        >
          <MdKeyboardArrowLeft />
          Back
        </button>
      </div>
    </div>
  );
}
