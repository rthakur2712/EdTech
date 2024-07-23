import React from 'react'
import CTAbutton from './CTAbutton'
import { TypeAnimation } from "react-type-animation";

export default function CodeBlock({position,reverse,heading,subheading,ctabtn1,ctabtn2,code,backgroundGradient,codeColor}) {
  return (
    <div className={`flex my-20 ${reverse?"flex-row-reverse":"flex-row"} justify-around`}>
        {/* section 1 */}
        <div className='flex flex-col w-[100%] lg:w-[40%] gap-4'>
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
        <div className=' h-fit code-background flex w-[100%] lg:w-[470px] border border-richblack-700 rounded-xl py-3  '>
            <div className='text-center flex flex-col w-[10%] text-richblack-200 font-semibold font-inter select-none'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`flex flex-col font-bold font-mono ${codeColor} pr-1 relative`}>
                <div className={`${backgroundGradient}`}></div>
                <TypeAnimation sequence={[code,2000,""]}
                repeat={Infinity} 
                cursor={true}
                style={{
                    whiteSpace: 'pre-line',
                    display: 'block',
                    overflowX: 'hidden',
                    fontSize: '16px',
                }}
                omitDeletionAnimation={true}/>
            </div>
        </div>

    </div>
  )
}
