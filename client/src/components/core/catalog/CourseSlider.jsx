import React from 'react'
import CourseCard from './CourseCard'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {FreeMode,Pagination,Navigation,Autoplay} from 'swiper/modules'

export default function CourseSlider({courses,delay}) {
  courses && console.log("courses",courses)
  return (
    <Swiper
    loop={true}
    slidesPerView={3}
    // navigation={true}
    // spaceBetween={10}
    autoplay={{
      delay:delay,
      disableOnInteraction: false,
    }}
    modules={[Navigation,Autoplay]}
    className="mySwiper"
    >
  <div className='flex'>{courses?.map((course)=>{
      return (
        <SwiperSlide>
          <CourseCard course={course} Height={"h-[200px]"} width={"w-[350px]"}/>
        </SwiperSlide>
      )
    })}</div>
    </Swiper>
  
  )
}
