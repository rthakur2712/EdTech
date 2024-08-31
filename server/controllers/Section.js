const Course = require("../models/Course");
const { find } = require("../models/OTP");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

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
        // if(checkSection){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Section already exists"
        //     })
        // }
        // create section
        const newSection = await Section.create({sectionName});
        // add section to course
        // populate section and sub-sections
        const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,
            {$push:
                {sections:newSection._id}
            },
            {new:true}
        ).populate({path:"sections",populate:{path:"subSection"}});
        ;
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
        const {sectionId,courseId} = req.body;
        // data validation
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Please provide all the details"
            })
        }
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }
        // delete subsection
        await SubSection.deleteMany({_id:{$in:section.subSection}});
        // delete section
        await Section.findByIdAndDelete({_id:sectionId});
        // await Course.findByIdAndDelete({_id:sectionId});
       
        // return response
        // update course
        const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,
            {$pull:
                {sections:sectionId}
            },
            {new:true}
        );
        
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            updatedCourseDetails
        })
    }catch(error){
        console.log("Error occured while deleting section",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}