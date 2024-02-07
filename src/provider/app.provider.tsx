import { useActions } from "@/hooks/useActions"
import { BooksType } from "@/interfaces/books.interface"
import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"
import { FC, ReactNode, useEffect } from "react"

interface Props {
  children: ReactNode
  courses: CourseType[]
  course: CourseType
  instructors: InstructorType[]
  books: BooksType[]
}

const AppProvider: FC<Props> = ({children, courses, course, instructors, books}): JSX.Element => {
  const { getCourses, getCourse, getInstructors, getBooks } = useActions()

  useEffect(() => {
    if(courses?.length) {
      getCourses(courses)
    } else {
      getCourses([])
    }
    if(instructors?.length) {
      getInstructors(instructors)
    } else {
      getInstructors([])
    }
    if(books?.length) {
      getBooks(books)
    } else {
      getBooks([])
    }
    if(course) {
      getCourse(course)
    }
  }, [course, courses])

  return <>{children}</>
}

export default AppProvider