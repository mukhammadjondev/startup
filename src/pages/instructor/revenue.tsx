import { withInstructorLayout } from "@/layout/instructor"
import { InstructorRevenuePageComponent } from "@/page-component"
import { NextPage } from "next"

const Revenue: NextPage = () => {
  return <InstructorRevenuePageComponent />
}

export default withInstructorLayout(Revenue)