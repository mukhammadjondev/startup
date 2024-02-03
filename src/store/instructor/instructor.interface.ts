import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"

export interface InstructorInitialStateType {
  isLoading: boolean
  error: string | null | unknown
  courses: CourseType[]
  course: CourseType | null
  instructors: InstructorType[]
}

export interface InstructorApplyBody {
  firstName: string
  lastName: string
  email: string
  socialMedia: string
  callback: () => void
}