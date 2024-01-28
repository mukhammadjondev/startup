import { withInstructorLayout } from "@/layout/instructor"
import { InstructorCoursesPageComponent } from "@/page-component"
import { NextPage } from "next"

const Courses: NextPage = () => {
  return <InstructorCoursesPageComponent />
}

export default withInstructorLayout(Courses)