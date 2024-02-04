import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"
import { UserType } from "@/interfaces/user.interface"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AdminInitialStateType } from "./admin.interface"

const initialState: AdminInitialStateType = {
  isLoading: false,
  error: null,
  courses: [],
  instructors: [],
  users: [],
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true
    },
    clearAdminError: state => {
      state.error = null
    },
    getCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.courses = action.payload
    },
    getInstructors: (state, action: PayloadAction<InstructorType[]>) => {
      state.instructors = action.payload
    },
    getUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload
    },
  },
})

export const adminReducer = adminSlice.reducer
export const adminSliceAction = adminSlice.actions