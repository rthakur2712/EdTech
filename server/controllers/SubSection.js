const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/uploadImageToCloudinary');
// create SubSection handler function
exports.createSubSection = async (req, res) => {
    try{
        // fetch data from request body
        const {sectionId,title,timeDuration,description} = req.body;
        // extract files from request body
        const video = req.file.videoFile;
        // validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        // upload files to cloudinary
        const videoFile = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        // create SubSection
        const newSubSection = await SubSection.create({title,timeDuration,description,videoFile:videoFile.secure_url});
        // add SubSection to section
        const updatedSection=await Section.findByIdAndUpadate({_id:sectionId},
            {
                $push:{
                    subSections:newSubSection._id
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