import { CourseType } from "@/interfaces/course.interface"

export interface InstructorInitialStateType {
  isLoading: boolean
  error: string | null | unknown
  courses: CourseType[]
  course: CourseType | null
}

export interface InstructorApplyBody {
  firstName: string
  lastName: string
  email: string
  socialMedia: string
  callback: () => void
}

export interface SectionType {
  _id: string
  title: string
  lessons: []
}

export interface LessonType {
  _id: string
  name: string
  material: string
  embedVideo: string
  hour: string
  minute: string
  second: string
}