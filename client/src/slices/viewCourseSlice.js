import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
};
console.log("completed lectures", localStorage.getItem("completedLectures"));
console.log(
  "completed lectures",
  JSON.parse(localStorage.getItem("completedLectures"))
);
const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      console.log("action.payload", action.payload);
      state.courseSectionData = action.payload;
    },
    setEntireCourseData: (state, action) => {
      console.log("action.payload", action.payload);
      state.courseEntireData = action.payload;
    },
    setTotalNoOfLectures: (state, action) => {
      console.log("action.payload", action.payload);
      state.totalNoOfLectures = action.payload;
    },
    setCompletedLectures: (state, action) => {
      // console.log("action.payload", action.payload);
      state.completedLectures = action.payload;
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload];
    },
  },
});

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
