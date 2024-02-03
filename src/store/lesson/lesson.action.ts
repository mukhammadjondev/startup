import { errorCatch } from "@/helpers/api.helper"
import { LessonType, SectionType } from "@/interfaces/instructor.interface"
import { LessonService } from "@/services/lesson.service"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { LessonBodyType } from "./lesson.interface"

export const createLesson = createAsyncThunk<SectionType, LessonBodyType>(
  'lesson/create', async(body, thunkApi) => {
  try {
    const response = await LessonService.createLesson(body)
    body.callback()
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(errorCatch(error))
  }
})

export const deleteLesson = createAsyncThunk<SectionType, LessonBodyType>(
  'lesson/delete', async(body, thunkApi) => {
  try {
    const response = await LessonService.deleteLesson(body)
    body.callback()
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(errorCatch(error))
  }
})

export const editLesson = createAsyncThunk<LessonType, LessonBodyType>(
  'lesson/edit', async(body, thunkApi) => {
  try {
    const response = await LessonService.editLesson(body)
    body.callback()
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(errorCatch(error))
  }
})