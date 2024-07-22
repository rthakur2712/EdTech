import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import HighlightText from "../components/core/home/HighlightText";
import CTAbutton from "../components/core/home/CTAbutton";
import bgImage from "../assets/bgImage/coding bg1.jpg";
import bannerVideo from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/home/CodeBlock";

export default function Home() {
  return (
    <div>
      {/* background image */}
      <div>
        <div
          className="w-full h-[450px] md:h-[650px] absolute top-0 left-0 opacity-[0.3] overflow-hidden object-cover
            "
        >
          <img
            src={bgImage}
            alt="bgImage"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/80 to-black"></div>
      </div>
      {/* section 1 */}
      <div className="relative items-center  flex flex-col w-11/12 mx-auto text-white max-w-maxContent justify-between">
        <Link to={"/signup"}>
          <div
            className="group mt-40 p-1 mx-auto rounded-full bg-richblack-800 fond-bold text-richblack-200
                transition-all duration-200 hover:scale-95 hover:bg-richblack-900  cursor-pointer "
          >
            <div
              className="flex items-center px-6 py-[5px] gap-2 
                    transition-all duration-200"
            >
              <p>Become an Instructor</p>
              <FaArrowRightLong />
            </div>
          </div>
        </Link>
        <div className="w-[913px] mt-8">
          <div className="text-center text-4xl  ">
            Empower Your Future With <HighlightText text={"Coding Skills"} />
          </div>
          <div className="text-center text-lg text-richblack-300 leading-[24px] mt-4 ">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.{" "}
          </div>
        </div>
        <div className="flex gap-6 mt-8">
          <CTAbutton text={"Learn More"} active={1} linkto={"signup"} />
          <CTAbutton text={"Book a demo"} linkto={"login"} />
        </div>
        <div className="h-[515px] w-[1035px]  mx-3 my-20 customDropShadow overflow-hidden">
          <video muted loop autoPlay>
            <source src={bannerVideo} type="video/mp4" />
          </video>
        </div>
        <div>
         <CodeBlock heading={ <div className='text-3xl lg:text-4xl font-semibold'>
                                    Unlock Your
                                    <HighlightText text={"coding potential "} />
                                    with our online courses
                                </div>}
                    subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                    ctabtn1={
                        {
                            btnText: "try it yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "learn more",
                            linkto: "/login",
                            active: false,
                        }}
                    code={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n</nav>`}  
                    codeColor={"text-yellow-25"}  />
        </div>
      </div>
    </div>
  );
}
