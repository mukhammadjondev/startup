import { withInstructorLayout } from "@/layout/instructor"
import { InstructorDrafCourseComponent } from "@/page-component"
import { NextPage } from "next"

const DraftCourses: NextPage = () => {
  return <InstructorDrafCourseComponent />
}

export default withInstructorLayout(DraftCourses)