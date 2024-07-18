const express = require('express');
const router = express.Router();

// import controllers
const {updateProfile, deleteAccount ,getAllUserDetails,getAllEnrolledCourses,updateDisplayPicture} = require('../controllers/Profile');
// import middleware
const {auth} = require('../middlewares/auth');

// routes
router.post("/updateProfile",auth,updateProfile);
router.post("/deleteAccount",auth,deleteAccount);
router.get("/getAllUserDetails",auth,getAllUserDetails);
router.get("/getAllEnrolledCourses",auth,getAllEnrolledCourses);
router.post("/updateDisplayPicture",auth,updateDisplayPicture);

module.exports = router;