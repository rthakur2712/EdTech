const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
// create SubSection handler function
exports.createSubSection = async (req, res) => {
    try{
        // fetch data from request body
        const {sectionId,title,timeDuration,description} = req.body;
        // extract files from request body
        // console.log("req",req.body);
        const video = req.files.videoFile;
        // console.log("video",video);
        // validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        // upload files to cloudinary
        const videoFile = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        console.log(videoFile);
        // create SubSection
        const newSubSection = await SubSection.create({title,timeDuration,description,videoUrl:videoFile.secure_url});
        // add SubSection to section
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
            {
                $push:{
                    subSection:newSubSection._id
                }
            },
            {new:true}
            )
        // return response
        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            newSubSection:newSubSection,
            updatedSection:updatedSection
        })

    }catch(error){
        console.log("Error occured while creating SubSection",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// update SubSection handler function
exports.updateSubSection = async(req,res)=>{
    try{
        // data input
        const {subSectionId,title,timeDuration,description} = req.body;
        // data validation
        // if(!subSectionId || !title || !timeDuration || !description){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Please provide all details"
        //     })
        // }
        // update data
        await SubSection.findByIdAndUpdate(
            {_id:subSectionId},
            {title,timeDuration,description},
            {new:true}
        );
        return res.status(200).json({
            success:true,
            message:"SubSection updated successfully"
        })
    }catch(error){
        console.log("Error occured while updating SubSection",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// delete a subsection
exports.deleteSubSection = async(req,res)=>{
    try{
        const {subSectionId,sectionId} = req.body;
        if(!subSectionId){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        await SubSection.findByIdAndDelete({_id:subSectionId});
        await Section.findByIdAndUpdate({_id:sectionId},{
            $pull:{
                subSection:subSectionId
            }
        })
        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully"
        })
        // update section
       
    }catch(error){
        console.log("Error occured while deleting SubSection",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}