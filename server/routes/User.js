const express = require('express');
const router = express.Router();

// import controllers
const {
    login,
    signup,
    sendOTP,
    changePassword
} = require('../controllers/Auth');

const {
    resetPasswordToken,
    resetPassword
} = require('../controllers/ResetPassword');

// import middlewares
const { auth } = require('../middlewares/auth');

// routes
router.post("/login",auth, login);
router.post("/signup",auth, signup);
router.post("/sendOTP", sendOTP);
router.post("/changePassword", changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;