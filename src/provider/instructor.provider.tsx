import { useActions } from "@/hooks/useActions"
import { CourseType } from "@/interfaces/course.interface"
import { FC, ReactNode, useEffect } from "react"

interface Props {
  children: ReactNode
  courses: CourseType[]
  course: CourseType
}

const InstructorProvider: FC<Props> = ({children, courses, course}): JSX.Element => {
  const { instructorAllCourses, instructorDetailedCourse } = useActions()

  useEffect(() => {
    if(courses?.length) {
      instructorAllCourses(courses)
    } else {
      instructorAllCourses([])
    }
    if(course) {
      instructorDetailedCourse(course)
    }
  }, [course, courses])

  return <>{children}</>
}

export default InstructorProvider