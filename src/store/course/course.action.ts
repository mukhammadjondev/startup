import { errorCatch } from "@/helpers/api.helper"
import { CourseService } from "@/services/course.service"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { CourseCreateBodyInterface } from "./course.interface"

export const createCourse = createAsyncThunk<'Success', CourseCreateBodyInterface>(
  'course/create', async(body, thunkApi) => {
  try {
    const response = await CourseService.createCourse(body)
    body.callback()
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(errorCatch(error))
  }
})