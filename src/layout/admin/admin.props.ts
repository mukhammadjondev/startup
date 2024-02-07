import { BooksType } from "@/interfaces/books.interface"
import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"
import { UserType } from "@/interfaces/user.interface"

export interface AdminProps {
  courses: CourseType[]
  instructors: InstructorType[]
  users: UserType[]
  books: BooksType[]
}