import { useActions } from "@/hooks/useActions"
import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"
import { FC, ReactNode, useEffect } from "react"

interface Props {
  children: ReactNode
  courses: CourseType[]
  course: CourseType
  instructors: InstructorType[]
}

const AppProvider: FC<Props> = ({children, courses, course, instructors}): JSX.Element => {
  const { getCourses, getCourse, getInstructors } = useActions()

  useEffect(() => {
    getCourses(courses)
    getInstructors(instructors)
    if(course) {
      getCourse(course)
    }
  }, [course, courses])

  return <>{children}</>
}

export default AppProvider