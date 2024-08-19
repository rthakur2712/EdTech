const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
    SIGNUP_API : `${BASE_URL}/auth/signup`,
    LOGIN_API : `${BASE_URL}/auth/login`,
    SEND_OTP_API : `${BASE_URL}/auth/sendOTP`,
    RESETPASSTOKEN_API : `${BASE_URL}/auth/reset-password-token`,
    RESETPASSWORD_API : `${BASE_URL}/auth/reset-password`,
    TOKEN_LOGIN_API : `${BASE_URL}/auth/login-token`,
}

export const categories ={
    CATEGORIES_API:`${BASE_URL}/course/showAllCategory`,
}

export const settingsEndpoints = {
    UPDATE_PROFILE_API : `${BASE_URL}/profile/updateProfile`,
    DELETE_ACCOUNT_API : `${BASE_URL}/profile/deleteAccount`,
    GET_USER_DETAILS_API : `${BASE_URL}/profile/getAllUserDetails`,
    GET_ENROLLED_COURSES_API : `${BASE_URL}/profile/getAllEnrolledCourses`,
    UPDATE_DISPLAY_PICTURE_API : `${BASE_URL}/profile/updateDisplayPicture`,
}

export const profileEndpoints = {
 
        GET_USER_DETAILS_API: BASE_URL + "/profile/getAllUserDetails",
        GET_ALl_ENROLLED_COURSES_API: BASE_URL + "/profile/getAllEnrolledCourses",
        // GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
      }
