const Course = require("../models/Course");
const { find } = require("../models/OTP");
const Section = require("../models/Section");

// Create a new section
exports.createSection = async (req, res) => {
    try{
        // fetch data from request body
        const {courseId,sectionName} = req.body;
        // validation
        if(!courseId || !sectionName){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        // check if section exists or not
        const checkSection = await Section.findOne({sectionName});
        if(checkSection){
            return res.status(400).json({
                success:false,
                message:"Section already exists"
            })
        }
        // create section
        const newSection = await Section.create({sectionName});
        // add section to course
        // populate section and sub-sections
        const updatedCourseDetails=await Course.findByIdAndUpadate({_id:courseId},
            {$push:
                {sections:newSection._id}
            },
            {new:true}
        );
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails
        })
    }catch(error){
        console.log("Error occured while creating section",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// update section
exports.updateSection = async(req,res)=>{
    try{
        // data input
        const {sectionId,sectionName} = req.body;
        // data validation
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        // update data
        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {sectionName:sectionName},
            {new:true}
        )
        // return response
        return res.status(200).json({
            success:true,
            message:"Section updated successfully"
        })
    }catch(error){
        console.log("Error occured while updating section",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// delete section
exports.deleteSection = async(req,res)=>{
    try{
        // data input
        const {sectionId} = req.params;
        // data validation
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        // delete section
        await findAndDelete({_id:sectionId});
        // delete section from course
        // await Course.updateMany(
        //     {
        //         $pull:{
        //             sections:sectionId
        //         }
        //     }
        // )
        // return response
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        })
    }catch(error){
        console.log("Error occured while deleting section",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}