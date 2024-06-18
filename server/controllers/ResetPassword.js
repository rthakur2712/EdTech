const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

// reset password token
exports.resetPasswordToken = async (req, res) => {
  try {
    // get email from request ki body
    const { email } = req.body;
    // validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email",
      });
    }
    // check user for this email
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // generate token
    const token = crypto.randomUUID();
    // update user by adding token and expiry time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 3600000 },
      { new: true }
    );
    // create a link
    const url = `http://localhost:3000/update-password/${token}`;
    // send mail
    await mailSender(
      email,
      "Reset password link",
      `Reset Password Link : ${url}`
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Reset password link sent successfully",
    });
  } catch (error) {
    console.log("Error occured while sending reset password link", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// reset password
exports.resetPassword = async (req, res) => {
  try {
    // data fetch
    const { token, password, confirmPassword } = req.body;
    // validation
    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    // check user credentials from db using token
    const user = await User.findOne({ token: token });
    // check user
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    // check expiry time
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token expired",
      });
    }
    // check password and confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // update password
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword, token: null, resetPasswordExpires: null },
      { new: true }
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("Error occured while updating password", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
