import { AuthTokens, AuthUserResponse } from "@/store/user/user.interface";
import Cookies from "js-cookie";

export const saveTokensCookie = (data: AuthTokens) => {
  Cookies.set('accessToken', data.accessToken)
  Cookies.set('refreshToken', data.refreshToken)
}

export const saveStorage = (data: AuthUserResponse) => {
  saveTokensCookie(data)
  localStorage.setItem('user', JSON.stringify(data.user))
}

export const removeTokensCookie = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}