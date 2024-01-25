import { AuthTokens } from "@/store/user/user.interface";
import Cookies from "js-cookie";

export const saveTokensCookie = (data: AuthTokens) => {
  Cookies.set('access', data.accessToken)
  Cookies.set('refresh', data.refreshToken)
}

export const removeTokensCookie = () => {
  Cookies.remove('access')
  Cookies.remove('refresh')
}