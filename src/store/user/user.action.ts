import { errorCatch } from "@/helpers/api.helper";
import { AuthService } from "@/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthUserResponse, InterfaceEmailAndPassword } from "./user.interface";

export const register = createAsyncThunk<AuthUserResponse, InterfaceEmailAndPassword>('auth/register',
 async({email, password}, thunkApi) => {
  try {
    const response = await AuthService.register(email, password)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(errorCatch(error))
  }
})

export const login = createAsyncThunk<AuthUserResponse, InterfaceEmailAndPassword>('auth/login',
 async({email, password}, thunkApi) => {
  try {
    const response = await AuthService.login(email, password)
    return response
  } catch (error) {
    return thunkApi.rejectWithValue(errorCatch(error))
  }
})

export const logout = createAsyncThunk('auth/logout', () => {
  AuthService.logout()
})

export const checkAuth = createAsyncThunk<AuthUserResponse>('auth/check-auth',
 async (_, thunkApi) => {
  try {
    const response = await AuthService.getNewTokens()
    return response.data
  } catch (error) {
    console.log(error)
    return thunkApi.rejectWithValue(error)
  }
})