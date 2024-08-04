import React from "react";
import HighlightText from "../home/HighlightText";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/motionFrameVariants";
import BannerImg1 from "../../../assets/Images/aboutus1.webp";
import BannerImg2 from "../../../assets/Images/aboutus2.webp";
import BannerImg3 from "../../../assets/Images/aboutus3.webp";

export default function InnovationSection() {
  return (
    <div className="flex flex-col gap-20">
      <div className="bg-richblack-800">
        <div className="text-white w-[1200px] h-[518px] mx-auto text-center pt-20 flex flex-col gap-[38px] relative">
          <div className="px-[52px] w-[913px] mx-auto flex flex-col gap-4">
            <motion.div
              variants={fadeIn("down", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
            >
              <div className="text-4xl">
                Driving Innovation in Online Education for a{" "}
                <HighlightText text={"Brighter Future"} />
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.1 }}
            >
              <div className="text-richblack-300">
                {" "}
                Studynotion is at the forefront of driving innovation in online
                education. We're passionate about creating a brighter future by
                offering cutting-edge courses, leveraging emerging technologies,
                and nurturing a vibrant learning community.
              </div>
            </motion.div>
          </div>
          <div className="">
            <img
              src={BannerImg1}
              alt="banner"
              className="w-[384px] mx-auto absolute bottom-[-10] left-0"
            />
            <img
              src={BannerImg2}
              alt="banner"
              className="w-[384px] mx-auto absolute bottom-[-10] left-[50%] translate-x-[-50%]"
            />
            <img
              src={BannerImg3}
              alt="banner"
              className="w-[384px] mx-auto absolute bottom-[-10] right-0"
            />
          </div>
        </div>
      </div>
      <div className="text-white  px-[120px] py-[90px] text-4xl text-center font-bold border-b border-richblack-700">
        We are passionate about revolutionizing the way we learn. Our innovative
        platform <HighlightText text={"combines technology"} />{" "}
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">
          expertise
        </span>
        , and community to create an{" "}
        <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text">
          unparalleled educational experience.
        </span>
      </div>
    </div>
  );
}
