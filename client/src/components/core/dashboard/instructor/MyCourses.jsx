import React, { useEffect, useState } from "react";
import { deleteCourse, getIntructorCourses } from "../../../../services/operationa/course";
import { useDispatch, useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { COURSE_STATUS } from "../../../../data/dashboard-links";
import { RiTimer2Fill } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";


// import CoursesList from './CoursesList';

export default function MyCourses() {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  // const {course}=useSelector((state)=>state.course)
  const [courses, setCourses] = useState(null);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getIntructorCourses(token);
        console.log("data", data);
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if(loading){
    return <div className="flex justify-center items-center h-[90vh]"><div className="loader"></div></div>
  }
  const handleDelete=async(courseId)=>{
              // console.log("first")
             const result = await deleteCourse(courseId,token);
              // console.log("result",result)
             if(result){
                setCourses((p)=>(p.filter((item)=>item._id!==courseId.courseId)));
             }
         }
  const handleEdit=async(data)=>{
             console.log("data",data)
             dispatch(setCourse(data));
              // console.log("course",course)
             dispatch(setEditCourse(true));
            //  console.log("course",course)
             navigate('/dashboard/add-course')
         }
  return (
    <div className="mx-10 my-5 space-y-10">
      <div className="flex justify-between">
      <h1 className="text-richblack-5 text-3xl">My Courses</h1>
      <div className="bg-yellow-50 w-fit px-4 py-2 rounded-md flex items-center gap-1 cursor-pointer"
      onClick={()=>navigate("/dashboard/add-course")}
      >
      <span ><GoPlusCircle /></span>  Add Course
      </div>
      </div>
      
      <Table className="rounded-lg border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-3xl border-b border-b-richblack-800 px-6 py-2">
            <Th className="w-[70%] text-left text-sm font-medium uppercase text-richblack-100">Courses</Th>
            <Th className="text-left w-[10%] text-sm font-medium uppercase text-richblack-100">Status</Th>
            <Th className="text-left w-[10%] text-sm font-medium uppercase text-richblack-100">Price</Th>
            <Th className="text-left w-[10%] text-sm font-medium uppercase text-richblack-100">Actions</Th>
           
          </Tr>
        </Thead>
        <Tbody>
          {courses &&courses.map((item) => {
            return (
              <Tr key={item._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-6 items-center">
                <Td className="flex w-[70%] gap-6 p-2 items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.courseName}
                    className=" w-[200px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-4">
                    <p className="text-richblack-5 text-xl font-semibold capitalize">
                      {item.courseName}
                    </p>
                    <p className="text-richblack-100 text-sm">
                      {item.courseDescription}
                    </p>
                    <p className="text-richblack-25 text-xs">
                      {item.createdAt ? (
                        `Created: ${new Date(item.createdAt).toLocaleString()}`
                      ) : (
                        <p>Created: April 27, 2023</p>
                      )}
                    </p>
                  
                  </div>
                </Td>
                <Td className="w-[10%]  flex text-sm font-medium text-richblack-100">
                <p
                      className={`bg-richblack-700 w-fit px-2 py-[2px] rounded-lg text-xs flex gap-1 justify-center items-center ${
                        item.status === COURSE_STATUS.PUBLISHED
                          ? "text-yellow-50"
                          : "text-pink-100"
                      }`}
                    >
                      {item.status === COURSE_STATUS.PUBLISHED ? (
                        <IoIosCheckmarkCircle />
                      ) : (
                        <RiTimer2Fill />
                      )}
                      {item.status}
                    </p>
                </Td>
                <Td className="w-[10%]  flex text-sm font-medium text-richblack-100">
                {"₹"}{item.price}
                </Td>
                <Td className="w-[10%] text-sm font-medium text-richblack-100 flex ">
                  <div className="flex gap-3 text-2xl p-1">
                    <div onClick={() => handleEdit(item)} className="cursor-pointer">
                      <MdEdit />
                    </div>
                    <div
                      onClick={() => handleDelete({ courseId: item._id })}
                      className="cursor-pointer"
                    >
                      <MdDelete />
                    </div>
                  </div>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
}
