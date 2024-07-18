const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

// create rating
exports.createRating = async (req, res) => {
    try{
        // get user id and course id
        const userId = req.user.id;
        // fetch data from request body
        const {rating,review,courseId} = req.body;
        // check if uesr is enrolled in the course
        const courseDetails = await Course.findById({_id:courseId,
                                                     studentsEnrolled:{$elemMatch:{$eq:userId}}});
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"You are not enrolled in the course"
            })
        }
        // check if review by the user is already present
        const reviewCheck = await RatingAndReview.findOne({user:userId,course:courseId});
        if(reviewCheck){
            return res.status(400).json({
                success:false,
                message:"You have already reviewed the course"
            })
        }
        // create rating and review
        const newRatingReview = await RatingAndReview.create({
            user:userId,
            course:courseId,
            rating:rating,
            review:review
        });
        // update course with rating and review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},{
            $push:{
                ratingAndReviews:newRatingReview._id,
            }
        },{new:true}
        )
        console.log("updatedCourseDetails",updatedCourseDetails)
        // return response
        return res.status(200).json({
            success:true,
            message:"Rating and review added successfully",
            newRatingReview
        })
    }catch(error){
        console.log("Error occured while adding rating and review",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// get average rating
exports.averageRating = async(req,res)=>{
    try{
        // get course id 
        const courseId = req.body.courseId;
        // calculate average rating 
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    avarageRating:{$avg:"$rating"}
                }
            }
           
        ]
           
        )
        console.log("result",result)
        if(result.length === 0){
            return res.status(400).json({
                success:false,
                message:"No rating and review found",
                averageRating:0
            })
        }
        // return response
        return res.status(200).json({
            success:true,
            message:"Average rating fetched successfully",
            averageRating:result[0].avarageRating
        })
    }catch(error){
        console.log("Error occured while fetching average rating",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

// get all ratings and reviews
exports.getAllRatings = async(req,res)=>{
    try{
        // find all the ratings and reviews 
        const allRatings = await RatingAndReview.find({})
                                                .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image"
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName"
                                                })
                                                .exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"All ratings and reviews fetched successfully",
            data:allRatings
        })
    }catch(error){
        console.log("Error occured while fetching all ratings and reviews",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}