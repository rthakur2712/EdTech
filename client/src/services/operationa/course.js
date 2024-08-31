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
  // create a section
  export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
  
    try {
      const response = await apiConnector("POST", courseEndpoints.CREATE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE SECTION API RESPONSE............", response)
  
      if (!response?.data?.success) {
        throw new Error("Could Not Create Section")
      }
  
      result = response?.data?.updatedCourseDetails
      toast.success("Course Section Created")
    } catch (error) {
      console.log("CREATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  // ================ create SubSection ================
export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
  
    try {
      const response = await apiConnector("POST", courseEndpoints.CREATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE SUB-SECTION API RESPONSE............", response)
  
      if (!response?.data?.success) {
        throw new Error("Could Not Add Lecture")
      }
  
      result = response?.data?.updatedSection
      console.log("result",result)
      toast.success("Lecture Added")
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  // ================ Update Section ================
export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
  
    try {
      const response = await apiConnector("POST", courseEndpoints.UPDATE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SECTION API RESPONSE............", response)
  
      if (!response?.data?.success) {
        throw new Error("Could Not Update Section")
      }
  
      result = response?.data?.data
      toast.success("Course Section Updated")
    } catch (error) {
      console.log("UPDATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  // ================ Update SubSection ================
export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
  
    try {
      const response = await apiConnector("PUT", courseEndpoints.UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SUB-SECTION API RESPONSE............", response)
  
      if (!response?.data?.success) {
        throw new Error("Could Not Update Lecture")
      }
  
      result = response?.data?.updatedSection
      toast.success("Lecture Updated")
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }// ================ delete Section ================
export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
  
    try {
      const response = await apiConnector("DELETE", courseEndpoints.DELETE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
  
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
      }
  
      result = response?.data?.updatedCourseDetails;
      toast.success("Course Section Deleted")
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
  
  // ================ delete SubSection ================
  export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", courseEndpoints.DELETE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture")
      }
      result = response?.data?.updatedSection
      console.log("result",result)
      toast.success("Lecture Deleted")
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }