import { API_URL, getAuthUrl } from "@/config/api.config";
import { removeTokensCookie, saveStorage } from "@/helpers/auth.helper";
import { AuthUserResponse } from "@/store/user/user.interface";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthService = {
  async register(email: string, password: string) {
    const response = await axios.post<AuthUserResponse>(`${API_URL}${getAuthUrl('register')}`, {email, password})

    if(response.data.accessToken) {
      saveStorage(response.data)
    }

    return response.data
  },

  async login(email: string, password: string) {
    const response = await axios.post<AuthUserResponse>(`${API_URL}${getAuthUrl('login')}`, {email, password})

    if(response.data.accessToken) {
      saveStorage(response.data)
    }

    return response.data
  },

  logout() {
    removeTokensCookie()
    localStorage.removeItem('user')
  },

  async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken')
    const response = await axios.post(`${API_URL}${getAuthUrl('access')}`, {refreshToken})

    if(response.data.accessToken) {
      saveStorage(response.data)
    }

    return response.data
  }
}