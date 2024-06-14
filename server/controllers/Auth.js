const Users = require('../models/Users');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
require('dotenv').config();


// send otp
exports.sendOTP = async(req,res)=>{
    try{
        // fetch email from request body
        const {email}=req.body;
        // check if user already exists
        const checkUser = await Users.findOne({email});
        // if user is already registered then send a response
        if(checkUser){
            return res.status(401).json({
                success:false,
                message:"User already exists"
            })
        }
        // generate otp
        var otp = otpGenerator.generate(6, {uppercase:false, specialChars:false});
        console.log("Generated OTP : ",otp);

        // check unique otp or not
        let result = await OTP.findOne({otp: otp});

        // if otp is not unique then generate new otp
        while(result){
            otp = otpGenerator.generate(6, {uppercase:false, specialChars:false});
            result = await OTP.findOne({otp : otp});
        }

        const otpPayload = {email,otp}
        // create an entry for otp in db
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP body : ",otpBody);
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        })
    }catch(error){
        console.log("Error occured while sending OTP",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// signup
exports.signup = async(req,res)=>{
    try{
        // fetchin user data from resquest body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
            contactNumber
        } = req.body;
    // validate user data
    if(!firstName || !lastName || !email || !password || !confirmPassword  || !otp  ){
        return res.status(400).json({
            success:false,
            message:"Please fill all the fields"
        })
    }
    // match password and confirm password
    if(password !== confirmPassword){
        return res.status(500).json({
            success:false,
            message:"Password and confirm password does not match"
        })
    }
    // check if user already exists or not
    const checkUser = await Users.fondOne({email});
    if(checkUser){
        return res.status(401).json({
            success:false,
            message:"User is already registered"
        })
    }
    // find most recent otp for the user 
    const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
    if(recentOtp.length===0){
        return res.status(400).json({
            success:false,
            message:"otp not found"
        })
    }else if(recentOtp.otp !== otp){
        return res.status(400).json({
            success:false,
            message:"Invalid OTP"
        })
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password,10);
    const profileDetails = await profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null
    })
    // entry in db 
    const user = await Users.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        accountType,
        contactNumber,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/8.x/initials/svg?seed=${firstName}+${lastName}`
    })
    // send response
    return res.status(200).json({
        success:true,
        message:"User registered successfully"
    })

    }catch(error){
        console.log("Error occured while registering user",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// login
exports.login = async(req,res)=>{
    try{
        //fetch email and password from the request body
        const {email,password} = req.body;
        // validation of data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        // check if user exists or not
        const checkUser = await Users.findOne({email}).populate("additionalDetails");
        if(!checkUser){
            return res.status(401).json({
                success:false,
                message:"User not registered , please signup"
            })
        }
        // compare password
        if(await bcrypt.compare(password,checkUser.password)){
            const payload ={
                user:{
                    id:checkUser._id,
                    email:checkUser.email,
                    role:checkUser.accountType
                }
            }
            const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"})
           user.token=token;
           user.password=undefined;
           // create cookie and send response
           const options={
            expires:new Date(
                Date.now()+3*24*60*60*1000
            ),
            httpOnly:true
           }
           res.cookie("token",token,options).status(200).json({
                success:true,
                message:"User logged in successfully",
                user,
                token,
           })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        
        }
    }catch(error){
        console.log("Error occured while logging in",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
// change password
exports.changePassword = async(req,res)=>{
    try{
        // get data from request body
        const {oldPassword,newPassword,confirmPassword,email}=req.body;
        // validate data
        if(!oldPassword || !newPassword || !confirmPassword || !email){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        const user = await Users.findOne({email});
       if(await bcrypt.compare(oldPassword,user.password)){
              if(newPassword!==confirmPassword){
                return res.status(400).json({ 
                    success:false,
                    message:"Password and confirm password does not match"
                })
              }
              const hashedPassword = await bcrypt.hash(newPassword,10);
              // update password in db
                await Users.findOneAndUpdate({email},{password:hashedPassword});
                return res.status(200).json({
                    success:true,
                    message:"Password updated successfully"
                })
       }
        // send mail for updated password
        try{
            const mailResponse = await mailSender(
                email,"Password updated successfully","Your password has been updated successfully")
            console.log("Mail sent successfully",mailResponse);
            // return response
            return res.status(200).json({
                success:true,
                message:"Password updated successfully"
            })
        }catch(error){
            console.log("Error occured while sending mail : ",error);
            return res.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
       
    }catch(error){
        console.log("Error occured while changing password",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}