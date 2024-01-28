import { withInstructorLayout } from "@/layout/instructor"
import { EditDetailedCoursePageComponent } from "@/page-component"
import { NextPage } from "next"

const EditDetailedCourses: NextPage = () => {
  return <EditDetailedCoursePageComponent />
}

export default withInstructorLayout(EditDetailedCourses)