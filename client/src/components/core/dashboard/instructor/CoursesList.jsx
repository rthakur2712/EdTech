// import React from 'react'
// import { MdDelete } from "react-icons/md";
// import { MdEdit } from "react-icons/md";
// import { deleteCourse } from '../../../../services/operationa/course';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
// import {COURSE_STATUS} from '../../../../data/dashboard-links';
// import { IoIosCheckmarkCircle } from "react-icons/io";
// import { RiTimer2Fill } from "react-icons/ri";
// import { useNavigate } from 'react-router-dom';
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';


// export default function CoursesList({courses,loading,setCourses}) {
//     const {token} = useSelector(state=>state.auth);

//     const {course} = useSelector(state=>state.course);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     // console.log(course)
//     if(loading){
//         return <div className='flex justify-center items-center h-[60vh]'>
//             <div className='loader'></div>
//         </div>
//     }
//     if(courses.length===0){
//         <div>NO courses found</div>
//     }
//     const handleDelete=async(courseId)=>{
//         // console.log("first")
//         const result = await deleteCourse(courseId,token);
//         // console.log("result",result)
//         if(result){
//            setCourses((p)=>(p.filter((item)=>item._id!==courseId.courseId)));
//         }
//     }
//     const handleEdit=async(data)=>{
//         console.log("data",data)
//         dispatch(setCourse(data));
//         // console.log("course",course)
//         dispatch(setEditCourse(true));
//     //    console.log("course",course)
//         navigate('/dashboard/add-course')
//     }
// return (
//     // <div className='flex flex-col gap-5 border border-richblack-300 border-opacity-10 rounded-b-lg'>
//     //      {
//     //         courses&&courses.map((item)=>{
//     //                 return (
//     //                         <div key={item._id} className=' p-2 flex items-center rounded-lg'>
//     //                                 <div className='flex gap-6 w-[60%] p-2'>
//     //                                         <img src={item.thumbnail} alt={item.courseName} className=' w-[200px] rounded-lg object-contain'/>
//     //                                         <div className='flex flex-col gap-2'>
//     //                                                 <p className='text-richblack-5 text-xl font-semibold'>{item.courseName}</p>
//     //                                                 <p className='text-richblack-100 text-sm'>{item.courseDescription}</p>
//     //                                                 <p className='text-richblack-25 text-xs'>
//     //                                                         {item.createdAt ? `Created: ${new Date(item.createdAt).toLocaleString()}` : <p>Created: April 27, 2023</p>}
//     //                                                 </p>
//     //                                                 <p className={`bg-richblack-700 w-fit px-2 py-[2px] rounded-lg text-xs flex gap-1 items-center ${item.status === COURSE_STATUS.PUBLISHED ? "text-yellow-50" : "text-pink-100"}`}>
//     //                                                         {item.status === COURSE_STATUS.PUBLISHED ? <IoIosCheckmarkCircle /> : <RiTimer2Fill />}
//     //                                                         {item.status}
//     //                                                 </p>
//     //                                         </div>
//     //                                 </div>
//     //                                 <div className='flex w-[25%] text-richblack-100 justify-between ml-10'>
//     //                                         {/* <p>{item.duration ? item.duration : <div>00m{" "}00s</div>}</p> */}
//     //                                         <p>{"$"}{item.price}</p>
//     //                                         <p className='flex gap-3 text-2xl'>
//     //                                             <div onClick={()=>handleEdit(item)} className='cursor-pointer'>
//     //                                             <MdEdit />
//     //                                             </div>
                                                   
//     //                                                 <div onClick={() => handleDelete({ courseId: item._id })} className='cursor-pointer'>
//     //                                                         <MdDelete />
//     //                                                 </div>
//     //                                         </p>
//     //                                 </div>
//     //                         </div>
//     //                 )
//     //         })
//     //      }
//     // </div>
//     <div>
//         <Table>

//         </Table>
//     </div>
// )
// }