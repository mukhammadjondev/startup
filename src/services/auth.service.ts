import { API_URL, getAuthUrl, getMailUrl, getUserUrl } from "@/config/api.config";
import { removeTokensCookie, saveTokensCookie } from "@/helpers/auth.helper";
import { AuthUserResponse } from "@/store/user/user.interface";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthService = {
  async register(email: string, password: string) {
    const response = await axios.post<AuthUserResponse>(`${API_URL}${getAuthUrl('register')}`, {email, password})

    if(response.data.accessToken) {
      saveTokensCookie(response.data)
    }

    return response.data
  },

  async login(email: string, password: string) {
    const response = await axios.post<AuthUserResponse>(`${API_URL}${getAuthUrl('login')}`, {email, password})

    if(response.data.accessToken) {
      saveTokensCookie(response.data)
    }

    return response.data
  },

  async sentOtp(email: string, isUser: boolean) {
    const response = await axios.post<'Success'>(`${API_URL}${getMailUrl('send-otp')}`, {email, isUser})
    return response
  },

  async verifyOtp(email: string, otpVerification: string) {
    const response = await axios.post<'Success'>(`${API_URL}${getMailUrl('verify-otp')}`, {email, otpVerification})
    return response
  },

  async editProfilePassword(email: string, password: string) {
    const response = await axios.put<'Success'>(`${API_URL}${getUserUrl('edit-password')}`, {email, password})
    return response
  },

  async checkUser(email: string) {
    const response = await axios.post<'user' | 'no-user'>(`${API_URL}${getAuthUrl('check-user')}`, {email})
    return response.data
  },

  logout() {
    removeTokensCookie()
  },

  async getNewTokens() {
    const refreshToken = Cookies.get('refresh')
    const response = await axios.post(`${API_URL}${getAuthUrl('access')}`, {refreshToken})

    if(response.data.accessToken) {
      saveTokensCookie(response.data)
    }

    return response.data
  }
}