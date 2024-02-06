import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"
import { UserType } from "@/interfaces/user.interface"

export interface AdminInitialStateType {
  isLoading: boolean
  error: string | null | unknown
  courses: CourseType[]
  instructors: InstructorType[]
  users: UserType[]
}

export interface ApproveAndDeleteBody {
  instructorId: string
  callback: () => void
}