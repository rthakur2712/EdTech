const { instance } = require("../config/razorpay");
const { courseEnrollmentEmail } = require("../mail/courseEnrollment");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
// // capture payment and initiate razorpay order
// exports.capturePayment = async (req, res) => {
//   try {
//     // get courseId and userId
//     const { courseId } = req.body;
//     const userId = req.user.id;
//     // validation
//     // valid course id
//     if (!courseId) {
//       return res.status(400).json({ msg: "CourseId is required" });
//     }
//     // valid coursedetails
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(400).json({ msg: "Invalid CourseId" });
//     }
//     // course already bought by the user or not
//     const uid = mongoose.Types.ObjectId(userId);
//     if (course.studentsEnrolled.includes(uid)) {
//       return res.status(400).json({ msg: "Course already bought" });
//     }
//     // create order
//     const amount = course.price;
//     const currency = "INR";
//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: `receipt_${userId}_${courseId}`,
//       notes: {
//         courseId,
//         userId,
//       },
//     };
//     try {
//       // initiate the payment using razorpay
//       const paymentResponse = await instance.orders.create(options);
//       console.log(paymentResponse);
//       // return response
//       return res.status(200).json({
//         success: true,
//         courseName: course.courseName,
//         courseDescription: course.courseDescription,
//         thumbnail: course.thumbnail,
//         orderId: paymentResponse.id,
//         currency: paymentResponse.currency,
//         amount: paymentResponse.amount,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ msg: "could not initiate order" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };
// // verify signature of the payment
// exports.verifySignature = async (req, res) => {
//   try {
//     const webhookSecret = "12345678";
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");
//     if (signature !== digest) {
//       return res.status(400).json({ msg: "Invalid Signature" });
//     }
//     // get courseId and userId
//     const { courseId, userId } = req.body.payload.payment.entity.notes;
//     try {
//       // update course
//       const enrolledCourse = await Course.findByIdAndUpdate(
//         courseId,
//         {
//           $push: {
//             studentsEnrolled: userId,
//           },
//         },
//         {
//           new: true,
//         }
//       );
//       // update user
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//           },
//         },
//         {
//           new: true,
//         }
//       );
//       // send mail
//       const mailResponse = await mailSender(
//         enrolledStudent.email,
//         "Course Enrollment",
//         `You have successfully enrolled in ${enrolledCourse.courseName}`
//       );
//       console.log(mailResponse);
//       return res.status(200).json({
//         success: true,
//         msg: "Payment Successful",
//       });
//     } catch (error) {
//       console.log(error);
//       return res
//         .status(500)
//         .json({ msg: "error in updating user and courses" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };
// initiates the order
exports.capturePayment = async (req, res) => {
  const {courses}=req.body;
  const userId=req.user.user.id;

  if(courses.length===0){
    return res.status(400).json({msg:"Please provide Course ID"});
  }
  let totalAmount=0;
  for(const course_id of courses){
    try{
      const course=await Course.findById(course_id);
      if(!course){
        return res.status(400).json({msg:"Invalid Course ID"});
      }
      const uid=mongoose.Types.ObjectId(userId);
      if(course.studentsEnrolled.includes(uid)){
        return res.status(400).json({msg:"Course already bought"});
      }
      totalAmount+=course.price;
    }catch(error){
      console.log(error);
      return res.status(500).json({msg:"Internal Server Error"});
    } 
  }
    const options={
      amount:totalAmount*100,
      currency:"INR",
      receipt:Math.random(Date.now()).toString(),
    }
    try{
      const paymentResponse=await instance.orders.create(options);
      console.log(paymentResponse);
      return res.status(200).json({
        success:true,
        orderId:paymentResponse.id,
        currency:paymentResponse.currency,
        amount:paymentResponse.amount,
      });
    }catch(error){
      console.log(error);
      return res.status(500).json({msg:"Could not initiate order"});
    }

}

// verifies the signature
exports.verifySignature = async (req, res) => {
  const razorpay_order_id=req.body?.razorpay_order_id;
  const razorpay_payment_id=req.body?.razorpay_payment_id;
  const razorpay_signature=req.body?.razorpay_signature;
  const courses=req.body?.courses;
  const userId=req.user.user.id;

  if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || userId){
    return res.status(400).json({msg:"Payment failed"});
  }
  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
  if(expectedSignature === razorpay_signature){
  //  enroll user in the courses
    await enrolledStudents(courses,userId,res);
    return res.status(200).json({msg:"Payment successful"});
  }
  return res.status(400).json({msg:"Payment failed"});
}
const enrolledStudents = async(courses,userId,res)=>{
  if(!courses || !userId){
    return res.status(400).json({msg:"Please provide courses and userId"});
  }
  for(const course_id of courses){
    try{
      // const enrolledCourse=await Course.findById(course_id);
      // if(!enrolledCourse){
      //   return res.status(400).json({msg:"Invalid Course ID"});
      // }
      const uid=mongoose.Types.ObjectId(userId);
      // if(enrolledCourse.studentsEnrolled.includes(uid)){
      //   return res.status(400).json({msg:"Course already bought"});
      // }
      const enrolledCourse=await Course.findByIdAndUpdate(
        {_id:course_id},
        {$push:{studentsEnrolled:uid}},
        {new:true}
      );
      if(!enrolledCourse){
        return res.status(400).json({msg:"Invalid Course ID"});
      }
      const enrolledUser=await User.findByIdAndUpdate(userId,{
        $push:{
          courses:course_id,
        }
      },{new:true});
      const emailResponse=await mailSender(
        "Course Enrollment",
        `You have successfully enrolled in ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledUser.firstName} ${enrolledUser.lastName}`) 
      );
    }catch(error){
      console.log(error);
      return res.status(500).json({msg:"Internal Server Error"});
    }

  }
}