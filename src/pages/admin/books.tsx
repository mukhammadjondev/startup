import { withAdminLayout } from "@/layout/admin"
import { AdminBooksPageComponent } from "@/page-component"

const Books = () => {
  return <AdminBooksPageComponent />
}

export default withAdminLayout(Books)