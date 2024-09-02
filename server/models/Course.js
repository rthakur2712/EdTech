const mongoose = require("mongoose");
const Section = require("./Section");

const courseSchema = new mongoose.Schema(
  {
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
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
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
      ref: "RatingAndReview",
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
      ref: "Category",
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    duration: {
      type: String,
    },
  },
  { timestamps: true }
);



courseSchema.methods.deleteSections = async function () {
  try {
    // const section = await this.findById(sectionId);
    const section = await Section.find({ _id: { $in: this.sections } });
    for (let i = 0; i < section.length; i++) {
      await section[i].deleteSubSections();
      await Section.findByIdAndDelete({ _id: section[i]._id });
    }
  } catch (error) {
    console.log("Error occured while deleting sub-sections", error);
    throw error;
  }
};
module.exports = mongoose.model("Course", courseSchema);