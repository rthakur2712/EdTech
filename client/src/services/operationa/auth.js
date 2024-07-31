import {toast} from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("loading");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.LOGIN_API, {
                email,
                password,
            });
            console.log("api login response : ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
            dispatch(setUser({ ...response.data.user, image: userImage }));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.log("api login error : ", error);
            toast.error(error.response.data.message);
            // toast.error("Login failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}


export function signup(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    currentTab,
    otp,
    navigate
){
    return async(dispatch)=>{
        const toastId = toast.loading("loading");
        dispatch(setLoading(true));
        try{
            const response = await fetch(endpoints.SIGNUP_API,{
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                currentTab,
                otp
            })
            console.log("api signup response : ",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Signup Successful");
            navigate('/login');
       
        }catch(error){
            console.log("api signup error : ",error);
            toast.error("Signup failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}