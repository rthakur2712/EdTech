const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = require("../models/User");

// auth
exports.auth = async (req, res, next) => {
  try {
    // extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    // if token is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }
    // verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      req.user = decode;
      // console.log(req.user.id);
      
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    next();
  } catch (error) {
    console.log("Error occured while verifying token", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// is student
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  } catch (error) {
    console.log("Error occured while verifying student", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// is instructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.user.role !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  } catch (error) {
    console.log("Error occured while verifying instructor", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// is admin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Access denied",
      });
    }
  } catch (error) {
    console.log("Error occured while verifying admin", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
  next();
};
