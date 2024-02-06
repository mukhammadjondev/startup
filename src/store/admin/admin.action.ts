import { errorCatch } from "@/helpers/api.helper"
import { AdminService } from "@/services/admin.service"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApproveAndDeleteBody } from "./admin.interface"

export const approveInstructor = createAsyncThunk<'Success', ApproveAndDeleteBody>(
  'admin/approve-instructor', async(body, thunkApi) => {
  try {
    const response = await AdminService.approveInstructor(body.instructorId)
    body.callback()
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(errorCatch(error))
  }
})

export const deleteInstructor = createAsyncThunk<'Success', ApproveAndDeleteBody>(
  'admin/delete-instructor', async(body, thunkApi) => {
  try {
    const response = await AdminService.deleteInstructor(body.instructorId)
    body.callback()
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(errorCatch(error))
  }
})