import { UserType } from "@/interfaces/user.interface"

export interface UserInitialStateType {
  user: UserType | null
  isLoading: boolean
  error: string | null | unknown
}

export interface AuthTokens {
  refreshToken: string
  accessToken: string
}

export interface AuthUserResponse extends AuthTokens {
  user: UserType
}

export interface InterfaceEmailAndPassword {
  email: string
  password: string
}

export interface InterfaceEmailAndOtp {
  email: string
  otpVerification: string
}