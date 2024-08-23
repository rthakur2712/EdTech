import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../../../services/apiConnector";
import { categories } from "../../../../../services/apis";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function CourseInformation() {
    const {course, editCourse } = useSelector((state) => state.course);
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [subLinks, setSubLinks] = useState([]);
  const dispatch = useDispatch();
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("get", categories.CATEGORIES_API);
      // console.log("Sublinks result ", result);
      setSubLinks(result.data.categories);
    } catch (error) {
      console.log("failed to fetch categories ", error);
    }
  };
  useEffect(() => {
    fetchSubLinks();
  }, []);
  return (
    <div className="bg-richblack-800 rounded-md p-6">
      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-richblack-5 text-sm">
          <p>Course Title <sup className="text-pink-200">*</sup></p>
          <input
            type="text"
            placeholder="Enter Course Title"
            className="w-full bg-richblack-700 p-3 rounded-md text-sm"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            {...register("courseTitle", { required: true })}
          />
        </label>
        <label className="flex flex-col gap-1 text-richblack-5 text-sm ">
          <p>Course Short Description <sup className="text-pink-200">*</sup></p>
          <textarea
          placeholder="Enter Description"
          
           className="w-full bg-richblack-700 p-3 rounded-md h-[130px]"
           style={{
               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
             }}
            {...register("courseDescription", { required: true })}
          />
        </label>
        <label className="flex flex-col gap-1 text-richblack-5 text-sm relative">
          <p>Price <sup className="text-pink-200">*</sup></p>
          <input
            type="number"
            className="w-full bg-richblack-700 p-3 rounded-md pl-10"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            {...register("price", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
          />
          <HiOutlineCurrencyRupee
          className="absolute top-1/2 left-2 inline-block text-2xl text-richblack-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-richblack-5 text-sm">
          <p>Category <sup className="text-pink-200">*</sup></p>
          <select
            {...register("category", { required: true })}
            defaultValue=""
            className="w-full bg-richblack-700 p-3 rounded-md"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {subLinks.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        {/* course tags */}
        <ChipInput
        label="Tags"
        name="tag"
        placeholder="Enter tags"
        register={register}
        errors={errors}
        setValue={setValue}
        />
        {/* thumbnail upload */}
        <Upload
         name="thumbnail"
         label="Course Thumbnail"
         register={register}
         setValue={setValue}
         errors={errors}
         editData={editCourse ? course?.thumbnail : null}/>
         <label className="flex flex-col gap-1 text-richblack-5 text-sm">
            <p>Benifits of the course <sup className="text-pink-200">*</sup></p>
            <textarea 
            placeholder="Enter Benifits Of Course"
            className="w-full bg-richblack-700 p-3 rounded-md h-[100px]"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            {...register("whatWillYouLearn", { required: true })} />
         </label>
        <button className="bg-yellow-50 w-fit px-6 py-3 rounded-md flex items-center gap-2">Next<MdKeyboardArrowRight /></button>
      </form>
    </div>
  );
}
