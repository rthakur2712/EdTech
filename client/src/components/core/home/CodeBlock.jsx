import React from 'react'
import CTAbutton from './CTAbutton'

export default function CodeBlock({position,heading,subheading,ctabtn1,ctabtn2,code,backgroundGradient,codeColor}) {
  return (
    <div className={`flex my-20 justify-between gap-20`}>
        {/* section 1 */}
        <div className='flex flex-col w-[40%] gap-4'>
            <div className=' text-4xl'>
                {heading}
            </div>
            <div className=' text-lg text-richblack-300 leading-[24px] mt-2'>
                {subheading}
            </div>
            <div className='flex gap-8 pt-[52px]'>
                <CTAbutton text={ctabtn1.btnText} active={ctabtn1.active} linkto={ctabtn1.linkto}/> 
                <CTAbutton text={ctabtn2.btnText} active={ctabtn2.active} linkto={ctabtn2.linkto}/> 
            </div>

        </div>
        {/* section 2 */}
        <div></div>

    </div>
  )
}
