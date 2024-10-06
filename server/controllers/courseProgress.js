const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  console.log("courseId", courseId);
  console.log("subSectionId", subSectionId);
  console.log("req.user", req.user);
  const userId = req.user.user.id;
  console.log("userId", userId);
  try {
    if (!courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });
    console.log("course progress", courseProgress);
    if (!courseProgress) {
      return res.status(400).json({
        success: false,
        message: "Course progress not found",
      });
    } else {
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(400).json({
          success: false,
          message: "Already completed",
        });
      } else {
        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();
        return res.status(200).json({
          success: true,
          message: "Course progress updated successfully",
        });
      }
    }
  } catch (error) {
    console.log("Error occured while updating course progress", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
