import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { FaArrowRightLong } from 'react-icons/fa'
import HighlightText from "./HighlightText";
import CTAbutton from "./CTAbutton";
import bannerVideo from "../../../assets/Images/banner.mp4";
import CodeBlock from "./CodeBlock";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/motionFrameVariants";
import { FaArrowRightLong } from "react-icons/fa6";
import { HomePageExplore } from "../../../data/homepage-explore";

export default function Section1() {
    const [currentTab,setCurrentTab] = useState(HomePageExplore[0].tag);
    const [course,setCourse] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
    const setMyCourses = (value)=>{
        setCurrentTab(value.tag);
        setCourse(value.courses);
        setCurrentCard(value.courses[0].heading);
    }
    const setMyCard = (value)=>{
        setCurrentCard(value.heading);
    }
  return (
    <div>
      {" "}
      <div className="relative items-center  flex flex-col mx-auto text-white max-w-maxContent justify-between">
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
        <div className="w-[913px] mt-12">
          <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
          >
            <div className="text-center text-4xl  ">
              Empower Your Future With <HighlightText text={"Coding Skills"} />
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
          >
            <div className="text-center text-lg text-richblack-300 leading-[24px] mt-4 ">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.{" "}
            </div>
          </motion.div>
        </div>
        <div className="flex gap-6 mt-12">
          <CTAbutton text={"Learn More"} active={1} linkto={"signup"} />
          <CTAbutton text={"Book a demo"} linkto={"login"} />
        </div>
        <div className="h-[515px] w-[1035px]  mx-3 my-20 customDropShadow overflow-hidden mt-22">
          <video muted loop autoPlay>
            <source src={bannerVideo} type="video/mp4" />
          </video>
        </div>
        <div className="flex flex-col mx-auto w-[11/12] max-w-maxContent items-center justify-between ">
          <CodeBlock
            heading={
              <div className="text-3xl lg:text-4xl font-semibold">
                Unlock Your
                <HighlightText text={" coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            code={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref>One</a>\n<ahref="two/">two</a>\n</nav>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={"code-block1-grad"}
            reverse={false}
          />
          <CodeBlock
            heading={
              <div className="text-3xl lg:text-4xl font-semibold">
                Start
                <HighlightText text={" coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means youll be writing real code from your very first lesson"
            }
            ctabtn1={{
              btnText: "Continue lessons",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            code={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            codeColor={"text-white"}
            backgroundGradient={"code-block2-grad"}
            reverse={true}
          />
          <div className="flex flex-col gap-9 px-[120px] py-[90px] relative mb-[200px]">
            <div className="flex flex-col gap-3">
            <div className="text-4xl text-center">
              Unlock the <HighlightText text={"Power of Code"} />
            </div>
            <div className="text-center text-richblack-300 text-sm">
              Learn to Build Anything You Can Imagine
            </div>
            </div>
            
            <div className="flex bg-richblack-800 p-1 mt-5 gap-5 text-lg rounded-full mx-auto text-richblack-200">
                {
                    HomePageExplore.map((item,index)=>{
                        return(
                            <div key={index} className={`px-[28px] py-[7px] hover:bg-richblack-900 rounded-full cursor-pointer hover:text-white ${currentTab===item.tag?"bg-richblack-900 text-white":"bg-richblack-800"} `}
                            onClick={()=>setMyCourses(item)} >
                            
                                {item.tag}
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex px-[52px] gap-9 absolute bottom-[-265px] left-6">
                {
                    course.map((item,index)=>{
                        return (
                            <div key={index} className= {`flex flex-col w-[30%] ${currentCard===item.heading?"bg-white text-richblack-500":"bg-richblack-800"} cursor-pointer transition-all duration-300 hover:scale-95`}
                            onClick={()=>setMyCard(item)}>
                                <div className="px-[24px] pt-[32px] pb-[52px] flex flex-col gap-2">
                                <h2 className={` text-lg ${currentCard===item.heading?"text-black":"text-richblack-25"}`}>{item.heading}</h2>
                                <p className="text-richblack-400 leading-6 text-sm">{item.description}</p>
                                </div>    
                           
                            <div className={`flex justify-between py-[16px] px-[24px] ${currentCard===item.heading?"text-blue-500":"text-richblack-300"} border-t border-dashed border-richblack-600`}>
                                <div>{item.level}</div>
                                <div>{item.lessonNumber}<span> Lessons</span></div>
                            </div>
                            </div>
                        )
                    })
                }
            </div>
         
          </div>
          <div className="section2_bg h-[320px] bg-white text-white flex justify-center items-center gap-6">
          <CTAbutton
            text={"Explore Full catalog"}
            linkto={"/signup"}
            active={true}
          />
          <CTAbutton text={"Lear more"} linkto={"/login"} active={false} />
        </div>
        </div>
      </div>
     
    </div>
  );
}
