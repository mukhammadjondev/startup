import { InstructorType } from "@/interfaces/instructor.interface"
import { withAdminLayout } from "@/layout/admin"
import { AdminInstructorsPageComponent } from "@/page-component"
import { AdminService } from "@/services/admin.service"
import { GetServerSideProps } from "next"

const Instructors = () => {
  return <AdminInstructorsPageComponent />
}

export default withAdminLayout(Instructors)

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({ req }) => {
	const instructors = await AdminService.getAllInstructors(req.cookies.refresh)

	return {
		props: {instructors}
	}
}

interface CoursesPageType extends Record<string, unknown> {
	instructors: InstructorType[]
}