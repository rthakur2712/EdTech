import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operationa/course";
import { setCourse } from "../../../../../slices/courseSlice";
import Upload from "./Upload";

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDescription", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle === modalData.title &&
      currentValues.lectureDescription === modalData.description &&
      currentValues.lectureVideo === modalData.videoUrl
    ) {
      return false;
    }
    return true;
  };
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDescription !== modalData.description) {
      formData.append("description", currentValues.lectureDescription);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoFile", currentValues.lectureVideo);
    }
    const result = await updateSubSection(formData, token);
    if (result) {
        const updatedCourseContent = course.sections.map((section) =>{
            return(
                section._id === modalData.sectionId ? result : section
            )    
        }  
          )
          const updatedCourse = { ...course, sections: updatedCourseContent }   
          dispatch(setCourse(updatedCourse))
      }
    setModalData(null);
  };
  const onSubmit = async (data) => {
    if (view) {
      return;
    }
    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made");
      } else {
        handleEditSubSection();
      }
      return;
    }
    if (add) {
      const formData = new FormData();
      console.log("section id", modalData.sectionId);
      formData.append("sectionId", modalData.sectionId);
      formData.append("title", data.lectureTitle);
      formData.append("description", data.lectureDescription);
      formData.append("videoFile", data.lectureVideo);
      const result = await createSubSection(formData, token);
      if (result) {
        const updatedCourseContent = course.sections.map((section) =>{
            // console.log("section._id",section._id)
            // console.log("modalData",modalData.sectionId)
            return(
                section._id === modalData.sectionId ? result : section
            )
           
        }
           
          )
        //   console.log("updatedSections",updatedCourseContent)
          const updatedCourse = { ...course, sections: updatedCourseContent }
        //   console.log("updatedCourse", updatedCourse)   
          dispatch(setCourse(updatedCourse))
      }
      console.log("course",course)
      setModalData(null);
    }
  };
  const cancelHandler = () => {
    setModalData(null);
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-[665px] bg-[#161d29] rounded-lg">
        <div className="py-4 px-6 bg-richblack-700 rounded-t-lg">
          <p className="text-lg font-semibold">
            {view && "Viewing "}
            {add && "Adding "}
            {edit && "Editing "} Lecture
          </p>
        </div>
        <form
          className="p-8 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData?.videoUrl : null}
            editData={edit ? modalData?.videoUrl : null}
          />
          <label className="flex flex-col gap-1">
            <p className="text-sm">
              Lecture Title <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter Lecture Title"
              className="text-sm p-3 w-full bg-richblack-700 rounded-lg"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              {...register("lectureTitle", { required: true })}
            />
            {errors.lectureTitle && (
              <span className="text-pink-300">Lecture Title is Required</span>
            )}
          </label>
          <label className="flex flex-col gap-1">
            <p className="text-sm">
              Lecture Description <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter Lecture Description"
              className="text-sm p-3 w-full bg-richblack-700 rounded-lg"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              {...register("lectureDescription", { required: true })}
            />
            {errors.lectureDescription && (
              <span className="text-pink-300">
                Lecture Description is Required
              </span>
            )}
          </label>
          <div className="flex flex-row-reverse gap-4">
           { (add||edit)&&<button
              type="submit"
              className="py-2 px-4 bg-yellow-50 text-richblack-900 rounded-lg"
            >
              {add && "Save"}
              {edit && "Save Changes"}
            </button>}
            <button
              onClick={cancelHandler}
              className="py-2 px-4 bg-richblack-700 text-richblack-5 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
