import { useActions } from "@/hooks/useActions"
import { BooksType } from "@/interfaces/books.interface"
import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"
import { UserType } from "@/interfaces/user.interface"
import { FC, ReactNode, useEffect } from "react"

interface Props {
  children: ReactNode
  courses: CourseType[]
  instructors: InstructorType[]
  users: UserType[]
  books: BooksType[]
}

const AdminProvider: FC<Props> = ({children, courses, instructors, users, books}): JSX.Element => {
  const { getAdminCourses, getAdminInstructors, getAdminUsers, getBooks } = useActions()

  useEffect(() => {
    if(courses?.length) {
      getAdminCourses(courses)
    } else {
      getAdminCourses([])
    }
    if(instructors?.length) {
      getAdminInstructors(instructors)
    } else {
      getAdminInstructors([])
    }
    if(users?.length) {
      getAdminUsers(users)
    } else {
      getAdminUsers([])
    }
    if(books?.length) {
      getBooks(books)
    } else {
      getBooks([])
    }

  }, [courses, instructors, users, books])

  return <>{children}</>
}

export default AdminProvider