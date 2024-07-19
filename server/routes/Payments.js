const express = require('express');
const router = express.Router();

// import controllers
const {capturePayment,verifySignature} = require('../controllers/Payments');
// import middlewares
const{auth,isStudent,isInstructor,isAdmin} = require('../middlewares/auth');

// routes
router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifySignature",verifySignature);

module.exports = router;