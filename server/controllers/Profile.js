const { find, findById } = require("../models/OTP");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// update profile details handler
exports.updateProfile = async (req, res) => {
    try{
        // fetch data from request body
        const {gender,dateOfBirth="",about="",contactNumber} = req.body;
        const id = req.user.user.id;
        // validation
        if(!id || !gender || !dateOfBirth || !contactNumber){
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
        const id = req.user.user.id;
        const userDetails = await User.findById(id).populate('additionalDetails').exec();
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
// get all enrolled courses
exports.getAllEnrolledCourses = async(req,res)=>{
    try{
        const userId = req.user._id;
        // validation
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"Please provide userId"
            })
        }
        // find user 
        const userDetails = await User.findById(userId).populate("enrolledCourses").exec();
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const allEnrolledCourses = userDetails.enrolledCourses;
        if(allEnrolledCourses.length === 0){
            return res.status(400).json({
                success:false,
                message:"No courses found"
            })
        }
        // return response
        return res.status(200).json({
            success:true,
            message:"Enrolled courses fetched successfully",
            data:allEnrolledCourses
        })
    }catch(error){
        console.log("Error occured while fetching enrolled courses",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// update profile image handler
exports.updateDisplayPicture = async(req,res)=>{
    try{
        // fetch user id and display picture
        const userId = req.user.user.id;
        const displayPicture = req.files.displayPicture;
        console.log(req.user)
        // validation
        // console.log(displayPicture)
        if(!userId || !displayPicture){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        const image = await uploadImageToCloudinary(displayPicture,process.env.FOLDER_NAME,1000,1000);
        console.log("image",image);
        // update profile image
 
            const updateProfile = await User.findByIdAndUpdate(
                {_id:userId},
                {image:image.url},
                {new:true}
            )
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile image updated successfully",
            data:updateProfile
        })
    }catch(error){
        console.log("Error occured while updating profile image",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}