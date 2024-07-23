import React from "react";
import { Link } from "react-router-dom";

export default function CTAbutton({ text, linkto, active }) {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[16px] px-6 py-3 rounded-md font-bold
            ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
            hover:scale-95 transition-all duration-200 cursor-pointer`}
      >
        {text}
      </div>
    </Link>
  );
}
