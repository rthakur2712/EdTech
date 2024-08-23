import { createSlice } from "@reduxjs/toolkit";

const initialState={
    courseSectionData:[],
    courseEntireData:[],
    completeLectures:[],
    totalNoOfLectures:0
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData:(state,action)=>{
            state.courseSectionData=action.payload
        },
        setCourseEntireData:(state,action)=>{
            state.courseEntireData=action.payload
        },
        setCompletedlectures:(state,action)=>{
            state.completeLectures=action.payload
        },
        updateCompleteLectures:(state,action)=>{
            state.completeLectures=[...state.completeLectures,action.payload]
        },
    }
})
export const {
    setCourseSectionData,
    setCourseEntireData,
    setCompletedlectures,
    updateCompleteLectures
}=viewCourseSlice.actions;
export default viewCourseSlice.reducer