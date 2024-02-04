import { useActions } from "@/hooks/useActions"
import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"
import { UserType } from "@/interfaces/user.interface"
import { FC, ReactNode, useEffect } from "react"

interface Props {
  children: ReactNode
  courses: CourseType[]
  instructors: InstructorType[]
  users: UserType[]
}

const AdminProvider: FC<Props> = ({children, courses, instructors, users}): JSX.Element => {
  const { getCourses, getInstructors, getUsers } = useActions()

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
    if(users?.length) {
      getUsers(users)
    } else {
      getUsers([])
    }

  }, [courses, instructors, users])

  return <>{children}</>
}

export default AdminProvider