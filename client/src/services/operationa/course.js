import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

export const getIntructorCourses = async (token) => {
    let result =[];
    try {
        const response = await apiConnector('GET', courseEndpoints.GET_ALL_INSTRUCTOR_COURSE_DETAILS_API,null,
        {
            Authorization: `Bearer ${token}`
        });
        console.log("Response of get all courses",response);
        result = response.data.courses;
    } catch (error) {
        console.log("Error occured while getting all courses",error);
    }
    return result;
}
// create a course
export const addCourse=async(data,token)=>{
    let result=null;
    const toastId=toast.loading("Loading...");
    try {
        const response=await apiConnector("POST",courseEndpoints.CREATE_COURSE_API,data,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
        });
        console.log("CREATE COURSE API RESPONSE............",response);
        // if(!response?.data?.success){
        //     throw new Error("Could not create course");
        // }
        result=response?.data?.course;
        toast.success("Course Created Successfully");
    } catch (error) {
        console.log("CREATE COURSE API ERROR............",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}
// edit course details
export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
  
    try {
      const response = await apiConnector("POST", courseEndpoints.EDIT_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("EDIT COURSE API RESPONSE............", response)
  
    //   if (!response?.data?.success) {
    //     throw new Error("Could Not Update Course Details")
    //   }
  
      result = response?.data?.data
      toast.success("Course Details Updated Successfully")
    } catch (error) {
      console.log("EDIT COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }