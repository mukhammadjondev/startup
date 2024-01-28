import { withInstructorLayout } from "@/layout/instructor"
import { EditCoursePageComponent } from "@/page-component"
import { NextPage } from "next"

const EditCourses: NextPage = () => {
  return <EditCoursePageComponent />
}

export default withInstructorLayout(EditCourses)