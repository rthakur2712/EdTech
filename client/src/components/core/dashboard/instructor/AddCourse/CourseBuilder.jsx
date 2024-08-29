import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import IconBtn from "../../../../common/IconBtn";
import { CiCirclePlus } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operationa/course";
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
  }
  const goNext = () => {
    if(course.sections.length===0){
      toast.error("Add a section to continue");
      return;
  }
  if(course.sections.some((section)=>section.subSection.length===0)){
    toast.error("Add atleast one Lecture to each Section")
    return;
  }
  dispatch(setStep(3));
}
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  const onSubmit=async(data)=>{
    let result;
    if(editSectionName){
       result = await updateSection({
        sectionName:data.sectionName,
        courseId:course._id,
        sectionId:editSectionName
      },token)
    }
    else{
      result = await createSection({
        sectionName:data.sectionName,
        courseId:course._id
      },token)
    }
    if(result){
      // toast.success("Section Created")
      dispatch(setCourse(result))
      dispatch(setEditCourse(true))
      setValue("sectionName","")
      setEditSectionName(null)
    }

  }
  const handleChangeEditSectionName=(sectionId,sectionName)=>{
    if(editSectionName===sectionId){
      cancelEdit();
      return
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName)

  }
  return (
    <div className="text-richblack-5">
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Section Name</label>
          <input
            type="text"
            placeholder="Add a Section to build your Course"
            className="w-full"
            {...register("sectionName", { required: true })}
          />
          {errors.sectioinName && <span>Sectioin Name is Required</span>}
        </div>
        <div>
        <button type="submit">{!editSectionName?<div><CiCirclePlus /><span>Create Section</span>
          </div>:<div><CiCirclePlus/>Edit Section Name</div>}</button>
          {editSectionName && <div onClick={cancelEdit}>Cancel Edit</div>}
        </div>
      </form>
      {course.sections.length>0 && <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>}
      <div>
      <button className="bg-yellow-50 w-fit px-6 py-3 rounded-md flex items-center gap-2"
      onClick={goNext}
      >Next<MdKeyboardArrowRight /></button>
      <button className="bg-richblack-50 w-fit px-6 py-3 rounded-md flex items-center gap-2"
      onClick={goBack}
      >Back<MdKeyboardArrowRight /></button>
      </div>
    </div>
  );
}
