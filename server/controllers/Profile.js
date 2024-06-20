const { find, findById } = require("../models/OTP");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");

// update profile details handler
exports.updateProfile = async (req, res) => {
    try{
        // fetch data from request body
        const {gender,dateOfBirth="",about="",contactNumber} = req.body;
        const id = req.user._id;
        // validation
        if(!id || !gender || !dateOfBirth || !about || !contactNumber){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        // find user
        const user=await User.findById(id);
        // find profile id from user
        const profileId = user.additionalDetails;
        // const profileDetails = await Profile.findById(profileId);
        // update profile
        const updateProfile = await Profile.findByIdAndUpdate(profileId,{
            dateOfBirth:dateOfBirth,
            gender:gender,
            contactNumber:contactNumber,
            about:about
        },
        {new:true}
        );
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updateProfile:updateProfile
        })
    }catch(error){
        console.log("Error occured while updating profile",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// delete account handler
exports.deleteAccount = async(req,res)=>{
    try{
        // // fetch details from request
        // const {password} = req.body;
        // fetch user id
        const id = req.user._id;
        const userDetails = await User.findById(id);
        // validation
       if(!userDetails){
              return res.status(400).json({
                success:false,
                message:"User not found"
              })
       }
        // delete user from all courses
        await Course.updateMany(
            {
                $pull:{
                    studentsEnrolled:id
                }
            }
        )
        // delete additional details
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // delete user
        await User.findByIdAndDelete({_id:id});
        // return response
        return res.status(200).json({
            success:true,
            message:"Account deleted successfully"
        })
    }catch(error){
        console.log("Error occured while deleting account",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// get all users details
exports.getAllUserDetails = async(req,res)=>{
    try{
        const id = req.user._id;
        const userDetails = await User.find(id).populate('additionalDetails').exec();
        return res.status(200).json({
            success:true,
            userDetails:userDetails
        })
    }catch(error){
        console.log("Error occured while fetching users",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}