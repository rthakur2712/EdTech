import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { RxDropdownMenu } from "react-icons/rx";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import SubSectionModal from "./SubSectionModal";
import ConformationModal from "../../../../common/ConformationModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operationa/course";
import { setCourse } from "../../../../../slices/courseSlice";

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [conformationModal, setConformationModal] = useState(false);
  // console.log("sections", course.sections);
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      token,
      courseId: course._id,
    });
    console.log("result", result);
    if (result) {
      dispatch(setCourse(result));
    }
    setConformationModal(null);
  };
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    console.log("subSectionId", subSectionId);
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    // console.log("subsection deleting result", result);
    if (result) {
      const updatedCourseContent = course.sections.map((section) =>{
          // console.log("section._id",section._id)
          // console.log("modalData",modalData.sectionId)
          return(
              section._id === sectionId ? result : section
          )
         
      }
         
        )
        // console.log("updatedSections",updatedCourseContent)
        const updatedCourse = { ...course, sections: updatedCourseContent }
        // console.log("updatedCourse", updatedCourse)   
        dispatch(setCourse(updatedCourse))
    }
    // console.log("updatedCourse", course); 
    setConformationModal(null);
  };
  return (
    <div
      className="text-richblack-50 bg-richblack-700 px-6 rounded-lg "
      style={{
        boxShadow: "inset -1px -1px rgba(255, 255, 255, 0.18)",
      }}
    >
      {course?.sections?.map((section) => {
        return (
          <details
            key={section._id}
            open
            className=" "
          >
            <summary className="flex justify-between py-3 border-b border-richblack-600">
              <div className="flex gap-2 items-center">
                <IoIosList />
                <p>{section.sectionName}</p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex gap-1">
                  <div className="text-xl">
                    <MdModeEdit />
                  </div>
                  <div
                    className="text-xl"
                    onClick={() =>
                      setConformationModal({
                        text1: "Are you sure you want to delete this section?",
                        text2:
                          "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setConformationModal(null),
                      })
                    }
                  >
                    <MdDelete />
                  </div>
                </div>

                <span className="text-xl font-thin opacity-40">|</span>
              </div>
            </summary>
            {section.subSection.map((data) => {
              return (
                <div key={data._id} 
                className="flex justify-between  pl-6 text-base items-center border-b border-richblack-600 py-2"
                >
                  <div className="flex gap-2 items-center cursor-pointer" onClick={() => setViewSubSection(data)}>
                    <IoIosList />
                    <p>{data.title}</p>
                  </div>
                  <div>
                    <div className="flex gap-1">
                      <div
                        className="text-base"
                        onClick={() =>
                          setEditSubSection({ ...data, sectionId: section._id })
                        }
                      >
                        <MdModeEdit />
                      </div>
                      <div
                        className="text-base"
                        onClick={() =>
                          setConformationModal({
                            text1:
                              "Are you sure you want to delete this section?",
                            text2: "This can not be undone",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConformationModal(null),
                          })
                        }
                      >
                        <MdDelete />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              className="flex items-center gap-2 text-yellow-50 py-2"
              onClick={() => setAddSubSection({sectionId:section._id})}
            >
              <FaPlus />
              <p>Add Lecture</p>
            </button>
          </details>
        );
      })}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : null}
      {conformationModal ? (
        <ConformationModal modalData={conformationModal} />
      ) : null}
    </div>
  );
}
