import { getAuthUrl, getMailUrl, getUserUrl } from "@/config/api.config";
import { removeTokensCookie, saveTokensCookie } from "@/helpers/auth.helper";
import { AuthUserResponse } from "@/store/user/user.interface";
import $axios from "@/api/axios";
import Cookies from "js-cookie";

export const AuthService = {
  async register(email: string, password: string) {
    const response = await $axios.post<AuthUserResponse>(`${getAuthUrl('register')}`, {email, password})

    if(response.data.accessToken) {
      saveTokensCookie(response.data)
    }

    return response.data
  },

  async login(email: string, password: string) {
    const response = await $axios.post<AuthUserResponse>(`${getAuthUrl('login')}`, {email, password})

    if(response.data.accessToken) {
      saveTokensCookie(response.data)
    }

    return response.data
  },

  async sentOtp(email: string, isUser: boolean) {
    const response = await $axios.post<'Success'>(`${getMailUrl('send-otp')}`, {email, isUser})
    return response
  },

  async verifyOtp(email: string, otpVerification: string) {
    const response = await $axios.post<'Success'>(`${getMailUrl('verify-otp')}`, {email, otpVerification})
    return response
  },

  async editProfilePassword(email: string, password: string) {
    const response = await $axios.put<'Success'>(`${getUserUrl('edit-password')}`, {email, password})
    return response
  },

  async checkUser(email: string) {
    const response = await $axios.post<'user' | 'no-user'>(`${getAuthUrl('check-user')}`, {email})
    return response.data
  },

  logout() {
    removeTokensCookie()
  },

  async getNewTokens() {
    const refreshToken = Cookies.get('refresh')
    const response = await $axios.post(`${getAuthUrl('access')}`, {refreshToken})

    if(response.data.accessToken) {
      saveTokensCookie(response.data)
    }

    return response.data
  }
}