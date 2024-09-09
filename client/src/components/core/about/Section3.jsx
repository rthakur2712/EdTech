import React from "react";
import HighlightText from "../home/HighlightText";
import CTAbutton from "../home/CTAbutton";

export default function Section3() {
  const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];
  return (
    <div>
      <div className="bg-richblack-800 px-[120px] py-[90px]  flex text-richblack-5 ">
        <div className="w-[25%] text-center flex flex-col gap-3">
          <h1 className="text-3xl">5K</h1>
          <p className="text-richblack-500 text-sm">Active Students</p>
        </div>
        <div className="w-[25%] text-center flex flex-col gap-3">
          <h1 className="text-3xl">10+</h1>
          <p className="text-richblack-500 text-sm">Mentors</p>
        </div>
        <div className="w-[25%] text-center flex flex-col gap-3">
          <h1 className="text-3xl">200+</h1>
          <p className="text-richblack-500 text-sm">Courses</p>
        </div>
        <div className="w-[25%] text-center flex flex-col gap-3">
          <h1 className="text-3xl">50+</h1>
          <p className="text-richblack-500 text-sm">Awards</p>
        </div>
      </div>
      <div className="grid grid-cols-4 mx-auto px-[120px] py-[90px] ">
        {LearningGridArray.map((card, i) => (
          <div
            key={i}
            className={`${i === 0 && "col-span-2"} ${
              card.order % 2 === 1
                ? "bg-richblack-700"
                : card.order % 2 === 0
                ? "bg-richblack-800"
                : "bg-transparent"
            }
                ${card.order === 3 && "col-start-2"}
                `}
          >
            {card.order < 0 ? (
              <div className="w-[90%] flex flex-col gap-3">
                <h1 className="text-richblack-5 text-4xl">
                  {card.heading} <HighlightText text={card.highlightText} />
                </h1>
                <p className="text-richblack-300">
                  Studynotion partners with more than 275+ leading universities
                  and companies to bring flexible, affordable, job-relevant
                  online learning to individuals and organizations worldwide.
                </p>
                <div className="w-fit pt-5">
                  <CTAbutton
                    text={card.BtnText}
                    link={card.BtnLink}
                    active={true}
                  />
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8 h-[250px]">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>
                <p className="text-richblack-200 text-sm">{card.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
