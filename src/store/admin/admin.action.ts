import { errorCatch } from "@/helpers/api.helper"
import { UserType } from "@/interfaces/user.interface"
import { AdminService } from "@/services/admin.service"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AdminSearchUsersResponse, AdminUserInterfaceResponse, ApproveAndDeleteBody } from "./admin.interface"

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

export const moreAdminUsers = createAsyncThunk<UserType[], AdminUserInterfaceResponse>(
  'admin/more-users', async(body, thunkApi) => {
  try {
    const response = await AdminService.getUsers(body.limit, body.token)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(errorCatch(error))
  }
})

export const searchAdminUsers = createAsyncThunk<UserType[], AdminSearchUsersResponse>(
  'admin/search-users', async(body, thunkApi) => {
  try {
    const response = await AdminService.searchUsers(body.query)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(errorCatch(error))
  }
})