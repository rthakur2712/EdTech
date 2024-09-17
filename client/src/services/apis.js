const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  SEND_OTP_API: `${BASE_URL}/auth/sendOTP`,
  RESETPASSTOKEN_API: `${BASE_URL}/auth/reset-password-token`,
  RESETPASSWORD_API: `${BASE_URL}/auth/reset-password`,
  TOKEN_LOGIN_API: `${BASE_URL}/auth/login-token`,
};
export const studentEndpoints = {
  COURSE_PAYMENT_API: `${BASE_URL}/payments/capturePayment`,
  VERIFY_PAYMENT_API: `${BASE_URL}/payments/verifySignature`,
  SEND_PAYMENT_SUCCESS_EMAIL_API: `${BASE_URL}/payments/sendPaymentSuccessEmail`,
};

export const categories = {
  CATEGORIES_API: `${BASE_URL}/course/showAllCategory`,
};

export const settingsEndpoints = {
  UPDATE_PROFILE_API: `${BASE_URL}/profile/updateProfile`,
  DELETE_ACCOUNT_API: `${BASE_URL}/profile/deleteAccount`,
  GET_USER_DETAILS_API: `${BASE_URL}/profile/getAllUserDetails`,
  GET_ENROLLED_COURSES_API: `${BASE_URL}/profile/getAllEnrolledCourses`,
  UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/profile/updateDisplayPicture`,
};

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getAllUserDetails",
  GET_ALl_ENROLLED_COURSES_API: BASE_URL + "/profile/getAllEnrolledCourses",
  // GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};

export const courseEndpoints = {
    GET_COURSE_DETAILS_API: `${BASE_URL}/course/getCourseDetails`,
    GET_LECTURE_DETAILS_API: `${BASE_URL}/course/getLectureDetails`,
  GET_ALL_COURSE_DETAILS_API: `${BASE_URL}/course/getAllCourses`,
  GET_ALL_INSTRUCTOR_COURSE_DETAILS_API: `${BASE_URL}/course/getAllInstructorCourses`,
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  CREATE_SECTION_API: BASE_URL + "/course/createSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/createSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  CATALOG_PAGE_DETAILS_API: BASE_URL + "/course/categoryPageDetails",
};
