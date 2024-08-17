import toast from "react-hot-toast"
import {apiConnector} from "../apiConnector";
import { settingsEndpoints } from "../apis";

// update display picture
export function updateDisplayPicture(formdata,token){
    return async(dispatch)=>{
        const toastId=toast.loading('Updating Profile Picture')
        try{
            const response = await apiConnector('PUT',settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,formdata,{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${token}`
            });
            console.log("Response of update display picture",response);
             toast.success('Profile Picture Updated');
        }catch(error){
            console.log("Error occured while updating profile picture",error);
            toast.error('Error occured while updating profile picture');
        }
        toast.dismiss(toastId);
    }
}
// update profile
export function updateProfile(formdata,token,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading('Updating Profile')
        try{
            const response = await apiConnector('PUT',settingsEndpoints.UPDATE_PROFILE_API,formdata,{
                // "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            });
            console.log("Response of update profile",response);
            toast.success('Profile Updated');
             navigate('/dashboard/my-profile')
        }catch(error){
            console.log("Error occured while updating profile",error);
            toast.error('Error occured while updating profile');
        }
        toast.dismiss(toastId);
    }
}
// delete account
export function deleteAccount(token,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading('Deleting Account')
        try{
            const response = await apiConnector('DELETE',settingsEndpoints.DELETE_ACCOUNT_API,null,{
                // "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            });
            console.log("Response of delete account",response);
            toast.success('Account Deleted');
            navigate('/');
        }catch(error){
            console.log("Error occured while deleting account",error);
            toast.error('Error occured while deleting account');
        }
        toast.dismiss(toastId);
    }
}
// change password
export function changePassword(formdata,token){
    return async(dispatch)=>{
        const toastId=toast.loading('Changing Password')
        try{
            const response = await apiConnector('PUT',settingsEndpoints.CHANGE_PASSWORD_API,formdata,{
                // "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            });
            console.log("Response of change password",response);
            toast.success('Password Changed');
        }catch(error){
            console.log("Error occured while changing password",error);
            toast.error('Error occured while changing password');
        }
        toast.dismiss(toastId);
    }
}
