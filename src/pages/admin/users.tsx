import { withAdminLayout } from "@/layout/admin"
import { AdminUsersPageComponent } from "@/page-component"

const Users = () => {
  return <AdminUsersPageComponent />
}

export default withAdminLayout(Users)