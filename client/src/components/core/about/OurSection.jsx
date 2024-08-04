import React from "react";
import { motion } from "framer-motion";
import FoundingStory from "../../../assets/Images/FoundingStory.png";
import { fadeIn } from "../../common/motionFrameVariants";
import HighlightText from "../home/HighlightText";
export default function OurSection() {
  return (
    <div className="">
      <div className="flex justify-around items-center px-[120px] py-[90px]">
        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="flex flex-col w-[486px] text-white gap-3"
        >
          <h1 className="bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text text-4xl pb-3 font-bold">
            Our Founding Story{" "}
          </h1>
          <p className="text-richblack-300 ">
            Our e-learning platform was born out of a shared vision and passion
            for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for
            accessible, flexible, and high-quality learning opportunities in a
            rapidly evolving digital world.
          </p>
          <p className="text-richblack-300">
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems. We
            believed that education should not be confined to the walls of a
            classroom or restricted by geographical boundaries. We envisioned a
            platform that could bridge these gaps and empower individuals from
            all walks of life to unlock their full potential.
          </p>
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
        >
          <img src={FoundingStory} alt="Founding Story" className="w-[470px]" />
        </motion.div>
      </div>
      <div className=" flex justify-around px-[120px] py-[90px]">
        <div className="w-[40%] flex flex-col gap-6">
          <h1 className="text-4xl">
            <HighlightText text={"Our Vision"} />
          </h1>
          <p className="text-richblack-300">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </p>
        </div>
        <div className="w-[40%] flex flex-col gap-6">
          <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text text-4xl font-bold">
            Our Mission
          </h1>
          <p className="text-richblack-300">
            our mission goes beyond just delivering courses online. We wanted to
            create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}
