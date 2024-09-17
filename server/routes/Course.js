const express = require("express");
const router = express.Router();

// import controllers
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getAllInstructorCourses,
  editCourse,
  deleteCourse,
  getLectureDetails,
} = require("../controllers/Course");
// category controllers
const {
  createCategory,
  showAllCategory,
  categoryPageDetails,
} = require("../controllers/Category");
// section controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");
// subsection controllers
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");
// rating and review controllers
const {
  createRating,
  averageRating,
  getAllRatings,
} = require("../controllers/RatingAndReview");
// import middlewares
const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/auth");

// course routes
// course can only be created by instructors
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, editCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
router.post("/createSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);
router.post("/createSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.get("/getAllCourses", auth, getAllCourses);
router.post("/getCourseDetails", auth, getCourseDetails);
router.post("/getLectureDetails", auth, getLectureDetails);
router.get(
  "/getAllInstructorCourses",
  auth,
  isInstructor,
  getAllInstructorCourses
);

// category routes
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategory", showAllCategory);
router.post("/categoryPageDetails", categoryPageDetails);

// rating and review routes
router.post("/createRating", auth, isStudent, createRating);
router.get("/averageRating", auth, averageRating);
router.get("/getAllRatings", auth, getAllRatings);

module.exports = router;
