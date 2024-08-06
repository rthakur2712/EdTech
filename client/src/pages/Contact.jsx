import React from "react";
import ContactForm from "../components/common/ContactForm";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import Footer from "../components/common/Footer";

const contactDetails = [
  {
    Icon: <HiMiniChatBubbleLeftRight />,
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    Icon: <BiWorld />,
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "Akshya Nagar 1st Block 1st Cross, Bangalore-560016",
  },
  {
    Icon: <IoCall />,
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

export default function Contact() {
  return (
    <div>
      <div className="flex px-[120px] py-[90px] justify-around mx-auto">
        <div className="bg-richblack-800 h-fit p-6 rounded-lg flex flex-col gap-8">
          {contactDetails.map((ele, i) => {
            return (
              <div className="text-white flex items-start gap-1 p-2">
                <div className="text-3xl">{ele.Icon}</div>
                <div className="flex flex-col gap-[2px]">
                  <h1 className="text-richblack-5">{ele.heading}</h1>
                  <div className="text-xs flex flex-col text-richblack-300">
                    <div>{ele.description}</div>
                    <div>{ele.details}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className=" border border-opacity-95 border-richblack-600 rounded-lg w-[50%]">
          <div className="px-8 pt-8 flex flex-col gap-2">
            <h1 className="text-richblack-5 text-4xl">
              Got a Idea? We’ve got the skills. Let’s team up
            </h1>
            <p className="text-richblack-300 text-sm">
              Tall us more about yourself and what you’re got in mind.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
