import React from "react";
import ContactForm from "../../common/ContactForm";

export default function GetInTouch() {
  return (
    <div className="px-[420px] py-[90px]">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-richblack-5 text-4xl font-bold">Get in Touch</h1>
        <p className="text-richblack-300">
          We'd love to hear from you, please fill out this form
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
