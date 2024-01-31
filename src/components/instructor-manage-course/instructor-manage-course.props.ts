import { CourseType } from "@/interfaces/course.interface"

export interface InstructorManageCourseProps {
  titleBtn: string
  submitHandler: (data: CourseType) => void
  courseValues?: CourseType | null
}