import { withAdminLayout } from "@/layout/admin"
import { AdminCoursesPageComponent } from "@/page-component"

const Courses = () => {
  return <AdminCoursesPageComponent />
}

export default withAdminLayout(Courses)