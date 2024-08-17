const express = require('express');
const router = express.Router();

// import controllers
const {updateProfile, deleteAccount ,getAllUserDetails,getAllEnrolledCourses,updateDisplayPicture} = require('../controllers/Profile');
// import middleware
const {auth} = require('../middlewares/auth');

// routes
router.use(auth);
router.put("/updateProfile",updateProfile);
router.delete("/deleteAccount",deleteAccount);
router.get("/getAllUserDetails",getAllUserDetails);
router.get("/getAllEnrolledCourses",getAllEnrolledCourses);
router.put("/updateDisplayPicture",updateDisplayPicture);

module.exports = router;