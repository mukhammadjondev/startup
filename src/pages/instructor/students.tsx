import { withInstructorLayout } from "@/layout/instructor"
import { NextPage } from "next"

const Students: NextPage = () => {
  return (
    <div>Students</div>
  )
}

export default withInstructorLayout(Students)