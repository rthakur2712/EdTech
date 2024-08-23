import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import CourseInformation from './CourseInformation'
import CourseBuilder from './CourseBuilder'
import Publish from './Publish'

export default function RenderComponents() {
    console.log("hello")
    const { step } = useSelector((state) => state.course)
    console.log("step",step)
    const steps=[
        {
            id:1,
            title:'Course Information',
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        }
    ]
  return (
    <>
   <div className='grid gap-4 text-white'>
  <div className='grid grid-cols-3 gap-4'>
    {steps.map((item) => (
      <div className='flex flex-col gap-2 items-center'>
        <div className={`flex items-center rounded-full w-[38px] h-[38px] justify-center
             ${item.id===step?"bg-[#251400] text-yellow-50 border border-yellow-50":"bg-richblack-800 text-[#838894] border border-[#2c333f]"}
             ${step > item.id && "bg-yellow-50 text-yellow-50"}}`}>
          {step > item.id ? (
            <FaCheck className='text-yellow-800' />
          ) : (
            item.id
          )}
        </div>
        <div className='text-center'>
          {item.title}
        </div>
      </div>
    ))}
  </div>
</div>
{
    step===steps[0].id && <CourseInformation/>
}
{
    step===steps[1].id && <CourseBuilder/>
}
{
    step===steps[2].id && <Publish/>
}
</>
  )
}
