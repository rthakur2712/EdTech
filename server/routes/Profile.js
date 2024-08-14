const express = require('express');
const router = express.Router();

// import controllers
const {updateProfile, deleteAccount ,getAllUserDetails,getAllEnrolledCourses,updateDisplayPicture} = require('../controllers/Profile');
// import middleware
const {auth} = require('../middlewares/auth');

// routes
router.use(auth);
router.post("/updateProfile",updateProfile);
router.post("/deleteAccount",deleteAccount);
router.get("/getAllUserDetails",getAllUserDetails);
router.get("/getAllEnrolledCourses",getAllEnrolledCourses);
router.post("/updateDisplayPicture",updateDisplayPicture);

module.exports = router;