import { withInstructorLayout } from "@/layout/instructor"
import { InstructorCreateCourseComponent } from "@/page-component"
import { NextPage } from "next"

const CreateCourse: NextPage = () => {
  return <InstructorCreateCourseComponent />
}

export default withInstructorLayout(CreateCourse)