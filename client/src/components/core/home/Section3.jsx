import React from 'react'
import instructor_image from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAbutton from './CTAbutton'
import { motion } from 'framer-motion'
import { scaleUp } from '../../common/motionFrameVariants'

export default function Section3() {
  return (
    <div className='w-[11/12] flex px-[90px] py-[120px] gap-[98px]'>
        <motion.div
         variants={scaleUp}
         initial='hidden'
         whileInView={'show'}
         viewport={{ once: false, amount: 0.1 }}
         className='w-[50%]'
        >
        <div className=' customDropShadow'>
            <img src={instructor_image} alt="instructor_image"/>
        </div>
        </motion.div>
       <div className='text-white flex flex-col items-start w-[50%] justify-center gap-3'>
            <div className='font-semibold text-4xl w-[50%]'>Become an <HighlightText text={'Instructor'}/></div>
            <div className='text-richblack-300 w-[80%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
            <div className='pt-[52px]'> <CTAbutton text={'Start Teaching Today'} active={true}/></div>
        </div>
        
    </div>
  )
}
