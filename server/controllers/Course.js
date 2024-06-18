const Course = require("../models/Course");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Tags = require("../models/Tags");

// create courses handler function
exports.createCourse = async (req, res) => {
    try{
        // fetch all details from request body
        const {courseName,courseDescription,price,whatWillYouLearn,tag} = req.body;
        const thumbnail = req.file.thumbnailImage;
        // validation
        if(!courseName || !courseDescription || !price || !whatWillYouLearn || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }
        // role validation
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("instructorDetails",instructorDetails);
        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor not found"
            })
        }
        // tag validation
        const tagDetails = await tags.findById(Tags);
        if(!tagDetails){
            return res.status(400).json({
                success:false,
                message:"Tag not found"
            })
        }
        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        // create course
        const newCourse = await Course.create({
            courseName:courseName,
            courseDescription:courseDescription,
            instructor:instructorDetails._id,
            whatWillYouLearn:whatWillYouLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url
        })
        // add course to user
        await User.findByIdAndUpdate({id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}
            )
        // add course to tags
        await Tags.findByIdAndUpdate({id:tagDetails._id},
            
            {
                $push:{
                    courses:newCourse._id
                }
            },
            
            {new:true}
            )
        // return response
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            course:newCourse
        })
    }catch(error){
        console.log("Error occured while creating course",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}