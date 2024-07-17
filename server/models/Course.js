const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
  },
  courseDescription: {
    type: String,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  whatWillYouLearn: {
    type: String,
  },
  sections:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"
  }],
  tag: {
    type: [String],
    required: true,
  },
  // courseContent: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //   },
  // ],
  ratingAndReviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReview"
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Category"
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Course",courseSchema);
