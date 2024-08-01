const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
    SIGNUP_API : `${BASE_URL}/auth/signup`,
    LOGIN_API : `${BASE_URL}/auth/login`,
    SEND_OTP_API : `${BASE_URL}/auth/sendOTP`,
    RESETPASSTOKEN_API : `${BASE_URL}/auth/reset-password-token`,
    RESETPASSWORD_API : `${BASE_URL}/auth/reset-password`,
}

export const categories ={
    CATEGORIES_API:`${BASE_URL}/course/showAllCategory`,
}