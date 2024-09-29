// import React from "react";
// import CTAbutton from "./CTAbutton";
// import HighlightText from "./HighlightText";
// import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
// import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
// import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
// import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
// import timelineImage from "../../../assets/Images/TimelineImage.png";
// import { motion } from "framer-motion";
// import { fadeIn } from "../../common/motionFrameVariants";
// import know_your_progress from "../../../assets/Images/Know_your_progress.png";
// import compare_with_others from "../../../assets/Images/Compare_with_others.png";
// import plan_your_study from "../../../assets/Images/Plan_your_lessons.png";
// const timeline = [
//   {
//     Logo: Logo1,
//     heading: "Leadership",
//     Description: "Fully committed to the success company",
//   },
//   {
//     Logo: Logo2,
//     heading: "Responsibility",
//     Description: "Students will always be our top priority",
//   },
//   {
//     Logo: Logo3,
//     heading: "Flexibility",
//     Description: "The ability to switch is an important skills",
//   },

//   {
//     Logo: Logo4,
//     heading: "Solve the problem",
//     Description: "Code your way to a solution",
//   },
// ];
// export default function Section2() {
//   return (
//     <div className="bg-puregreys-5 text-richblack-700 py-[90px] flex flex-col gap-14">
//       <div className="w-[11/12] mx-auto max-w-maxContent flex gap-3">
//         <div className="w-[50%] font-bold text-4xl">
//           Get the Skills you need for a{" "}
//           <HighlightText text={"job that is in demand"} />
//         </div>
//         <div className="w-[50%] text-richblack-700 flex flex-col items-start gap-12">
//           <div>
//             The modern StudyNotion is the dictates its own terms. Today, to be a
//             competitive specialist requires more than professional skills.
//           </div>
//           <CTAbutton text={"Learn more"} linkto={"/signup"} active={true} />
//         </div>
//       </div>
//       <div className="w-[1200px] mx-auto max-w-maxContent flex gap-20 justify-around">
//         <motion.div
//           variants={fadeIn("right", 0.1)}
//           initial="hidden"
//           whileInView={"show"}
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <div className="py-10 ">
//             <div className="flex flex-col gap-8">
//               {timeline.map((item, index) => {
//                 return (
//                   <div className="flex gap-6 px-3 py-2">
//                     <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full">
//                       <img src={item.Logo} alt="logo" />
//                     </div>
//                     <div className="flex flex-col">
//                       <h2 className="font-semibold text-[18px]">
//                         {item.heading}
//                       </h2>
//                       <p className="text-richblack-700 text-base font-thin">
//                         {item.Description}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </motion.div>
//         <motion.div
//           variants={fadeIn("left", 0.1)}
//           initial="hidden"
//           whileInView={"show"}
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           <div className="relative">
//             <img
//               src={timelineImage}
//               className="w-[585px] customDropShadow"
//               alt="timelineimage"
//             />
//             <div className="flex justify-between py-7 bg-caribbeangreen-700 absolute left-[50%] translate-x-[-50%] translate-y-[-50%] text-caribbeangreen-300">
//               <div className="flex gap-8 items-center px-7">
//                 <p className="text-white font-bold text-2xl">10</p>
//                 <p className="text-xs">YEARS EXPERIENCE</p>
//               </div>
//               <div className="flex gap-8 items-center px-7  ">
//                 <p className="text-white font-bold text-2xl">250</p>
//                 <p className="text-xs">TYPES OF COURSES</p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//       <div className="px-[120px] py-[90px] flex flex-col gap-[52px]">
//         <div className=" flex flex-col items-center gap-3 text-center px-[220px]">
//           <div className="font-semibold text-4xl">
//             Your swiss knife for{" "}
//             <HighlightText text={"learning any language"} />
//           </div>
//           <p className="text-richblac-700">
//             Using spin making learning multiple languages easy. with 20+
//             languages realistic voice-over, progress tracking, custom schedule
//             and more.
//           </p>
//         </div>
//         <div className="flex justify-center items-center relative">
//           <img
//             src={know_your_progress}
//             alt="know_your_progress"
//             className=" object-contain -mr-32"
//           />
//           <img
//             src={compare_with_others}
//             alt="compare_with_others"
//             className="= object-contain "
//           />
//           <img
//             src={plan_your_study}
//             alt="plan_your_study"
//             className=" object-contain -ml-36 "
//           />
//         </div>
//         <div className="flex justify-center">
//           <CTAbutton text={"Learn more"} linkto={"/signup"} active={true} />
//         </div>
//         <div></div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import CTAbutton from "./CTAbutton";
import HighlightText from "./HighlightText";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/motionFrameVariants";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_study from "../../../assets/Images/Plan_your_lessons.png";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },

  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

export default function Section2() {
  return (
    <div className="bg-puregreys-5 text-richblack-700 py-[60px] md:py-[90px] flex flex-col gap-14">
      {/* Section Header */}
      <div className="w-[90%] md:w-[85%] mx-auto max-w-maxContent flex flex-col md:flex-row gap-6 md:gap-3">
        <div className="w-full md:w-[50%] font-bold text-2xl sm:text-3xl md:text-4xl">
          Get the Skills you need for a{" "}
          <HighlightText text={"job that is in demand"} />
        </div>
        <div className="w-full md:w-[50%] text-richblack-700 flex flex-col items-start gap-6 md:gap-12">
          <div className="text-sm sm:text-base md:text-lg">
            The modern StudyNotion is the dictates its own terms. Today, to be a
            competitive specialist requires more than professional skills.
          </div>
          <CTAbutton text={"Learn more"} linkto={"/signup"} active={true} />
        </div>
      </div>

      {/* Timeline Section */}
      <div className="w-[90%] md:w-[85%] mx-auto max-w-maxContent flex flex-col md:flex-row gap-10 md:gap-20 justify-around">
        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
        >
          <div className="py-10">
            <div className="flex flex-col gap-8">
              {timeline.map((item, index) => {
                return (
                  <div key={index} className="flex gap-4 md:gap-6 px-3 py-2">
                    <div className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] bg-white flex items-center justify-center rounded-full">
                      <img src={item.Logo} alt="logo" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-semibold text-[16px] sm:text-[18px]">
                        {item.heading}
                      </h2>
                      <p className="text-richblack-700 text-sm md:text-base font-thin">
                        {item.Description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
        >
          <div className="relative">
            <img
              src={timelineImage}
              className="w-full md:w-[585px] customDropShadow"
              alt="timelineimage"
            />
            <div className="flex justify-between py-7 bg-caribbeangreen-700 absolute left-[50%] translate-x-[-50%] translate-y-[-50%] text-caribbeangreen-300">
              <div className="flex gap-8 items-center px-7">
                <p className="text-white font-bold text-xl md:text-2xl">10</p>
                <p className="text-xs">YEARS EXPERIENCE</p>
              </div>
              <div className="flex gap-8 items-center px-7">
                <p className="text-white font-bold text-xl md:text-2xl">250</p>
                <p className="text-xs">TYPES OF COURSES</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="px-[20px] sm:px-[60px] md:px-[120px] py-[60px] md:py-[90px] flex flex-col gap-8 md:gap-[52px]">
        {/* Section Heading */}
        <div className="flex flex-col items-center gap-3 text-center px-2 sm:px-[120px] md:px-[220px]">
          <div className="font-semibold text-2xl sm:text-3xl md:text-4xl">
            Your swiss knife for{" "}
            <HighlightText text={"learning any language"} />
          </div>
          <p className="text-sm sm:text-base md:text-lg text-richblac-700">
            Using spin making learning multiple languages easy. With 20+
            languages, realistic voice-over, progress tracking, custom schedules
            and more.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center relative gap-4 md:gap-10">
          <img
            src={know_your_progress}
            alt="know_your_progress"
            className="object-contain sm:-mr-12 md:-mr-32"
          />
          <img
            src={compare_with_others}
            alt="compare_with_others"
            className="object-contain"
          />
          <img
            src={plan_your_study}
            alt="plan_your_study"
            className="object-contain sm:-ml-12 md:-ml-36"
          />
        </div>

        {/* Call to Action */}
        <div className="flex justify-center">
          <CTAbutton text={"Learn more"} linkto={"/signup"} active={true} />
        </div>
      </div>
    </div>
  );
}
