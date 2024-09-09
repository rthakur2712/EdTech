import React from "react";
import InnovationSection from "../components/core/about/InnovationSection";
import OurSection from "../components/core/about/OurSection";
import Section3 from "../components/core/about/Section3";
import Footer from "../components/common/Footer";
import GetInTouch from "../components/core/about/GetInTouch";

export default function About() {
  return (
    <div>
      <InnovationSection />
      <OurSection />
      <Section3 />
      <GetInTouch />
      <Footer />
    </div>
  );
}
