import { CourseType } from "@/interfaces/course.interface"
import { withAdminLayout } from "@/layout/admin"
import { AdminCoursesPageComponent } from "@/page-component"
import { AdminService } from "@/services/admin.service"
import { GetServerSideProps } from "next"

const Courses = () => {
  return <AdminCoursesPageComponent />
}

export default withAdminLayout(Courses)

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async () => {
	const courses = await AdminService.getAllCourses()

	return {
		props: {courses}
	}
}

interface CoursesPageType extends Record<string, unknown> {
	courses: CourseType[]
}