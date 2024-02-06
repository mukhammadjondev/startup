import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"
import { UserType } from "@/interfaces/user.interface"

export interface AdminProps {
  courses: CourseType[]
  instructors: InstructorType[]
  users: UserType[]
}