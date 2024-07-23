import React from "react";
import bgImage from "../assets/bgImage/coding bg1.jpg";
import Section1 from "../components/core/home/Section1";
import Section2 from "../components/core/home/Section2";

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
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/20 to-black"></div>
      </div>
      {/* section 1 */}
      <Section1 />
      {/* section 2 */}
      <Section2 />
    </div>
  );
}
