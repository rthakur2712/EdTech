const express = require("express");
const router = express.Router();

// import controllers
const {
  capturePayment,
  verifySignature,
  sendPaymentSuccessEmail,
} = require("../controllers/Payments");
// import middlewares
const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/auth");

// routes
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", auth, isStudent, verifySignature);
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);

module.exports = router;
