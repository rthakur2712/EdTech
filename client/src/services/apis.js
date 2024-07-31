const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
    SIGNUP_API : `${BASE_URL}/auth/signup`,
    LOGIN_API : `${BASE_URL}/auth/login`,
}

export const categories ={
    CATEGORIES_API:`${BASE_URL}/course/showAllCategory`,
}