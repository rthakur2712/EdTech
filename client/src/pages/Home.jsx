import React, { useEffect, useState } from "react";
import Section1 from "../components/core/home/Section1";
import Section2 from "../components/core/home/Section2";
import Section3 from "../components/core/home/Section3";
import Footer from "../components/common/Footer";

import BgImage1 from "../assets/random_bg_image/coding bg1.jpg";
import BgImage2 from "../assets/random_bg_image/coding bg2.jpg";
import BgImage3 from "../assets/random_bg_image/coding bg3.jpg";
import BgImage4 from "../assets/random_bg_image/coding bg4.jpg";
import BgImage5 from "../assets/random_bg_image/coding bg5.jpg";
import BgImage6 from "../assets/random_bg_image/coding bg6.jpeg";
import BgImage7 from "../assets/random_bg_image/coding bg7.jpg";
import BgImage8 from "../assets/random_bg_image/coding bg8.jpeg";
import BgImage9 from "../assets/random_bg_image/coding bg9.jpg";
import BgImage10 from "../assets/random_bg_image/coding bg10.jpg";
import BgImage11 from "../assets/random_bg_image/coding bg11.jpg";

const bgImages=[
  BgImage1,
  BgImage2,
  BgImage3,
  BgImage4,
  BgImage5,
  BgImage6,
  BgImage7,
  BgImage8,
  BgImage9,
  BgImage10,
  BgImage11,

]


export default function Home() {
  const [backgroundImage, setBgImage] = useState(null);

  useEffect(()=>{
    const bg = bgImages[Math.floor(Math.random()*bgImages.length)];
    setBgImage(bg);
  },[]);
  return (
    <div>
      {/* background image */}
      <div>
        <div
          className="w-full h-[450px] md:h-[650px] absolute top-0 left-0 opacity-[0.3] overflow-hidden object-cover
            "
        >
          <img
            src={backgroundImage}
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
      {/* section 3 */}
      <Section3 />
      {/* footer */}
      <Footer/>
    </div>
  );
}
