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