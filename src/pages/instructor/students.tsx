import { withInstructorLayout } from "@/layout/instructor"
import { InstructorStudentsPageComponent } from "@/page-component"
import { NextPage } from "next"

const Students: NextPage = () => {
  return <InstructorStudentsPageComponent />
}

export default withInstructorLayout(Students)