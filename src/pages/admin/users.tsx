import { UserType } from "@/interfaces/user.interface"
import { withAdminLayout } from "@/layout/admin"
import { AdminUsersPageComponent } from "@/page-component"
import { AdminService } from "@/services/admin.service"
import { GetServerSideProps } from "next"

const Users = () => {
  return <AdminUsersPageComponent />
}

export default withAdminLayout(Users)

export const getServerSideProps: GetServerSideProps<UsersPageType> = async ({ req }) => {
	const users = await AdminService.getUsers('10', req.cookies.refresh)

	return {
		props: {users}
	}
}

interface UsersPageType extends Record<string, unknown> {
	users: UserType[]
}