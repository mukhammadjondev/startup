import { withAdminLayout } from "@/layout/admin"
import { AdminInstructorsPageComponent } from "@/page-component"

const Instructors = () => {
  return <AdminInstructorsPageComponent />
}

export default withAdminLayout(Instructors)