import React, { useEffect, useRef, useState } from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className="flex justify-between py-1 px-6 flex-col">
        <div className={`flex items-center gap-2`}>
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p>{subSec?.title}</p>
        </div>
        {/* <div className="text-xs">{subSec.description}</div> */}
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion