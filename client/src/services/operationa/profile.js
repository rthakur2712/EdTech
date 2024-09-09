import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";

export async function getAllEnrolledCourses(token) {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_ALl_ENROLLED_COURSES_API,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("api getAllEnrolledCourses response : ", response);
    // if (!response.data.success) {
    //     throw new Error(response.data.message);
    // }
    result = response.data.data;
  } catch (error) {
    toast.error(error.response.data.message);
    console.log("api getAllEnrolledCourses error : ", error);
    throw error;
  }
  return result;
}
