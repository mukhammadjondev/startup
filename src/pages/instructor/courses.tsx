import { CourseType } from "@/interfaces/course.interface"
import { withInstructorLayout } from "@/layout/instructor"
import { InstructorCoursesPageComponent } from "@/page-component"
import { InstructorService } from "@/services/instructor.service"
import { GetServerSideProps, NextPage } from "next"

const Courses: NextPage<CoursesPageType> = () => {
  return <InstructorCoursesPageComponent />
}

export default withInstructorLayout(Courses)

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({ req }) => {
	const courses = await InstructorService.getAllCourses(req.cookies.refresh)

	return {
		props: {courses}
	}
}

interface CoursesPageType extends Record<string, unknown> {
	courses: CourseType[]
}