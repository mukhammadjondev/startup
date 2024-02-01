import { CourseType } from "@/interfaces/course.interface"
import { withInstructorLayout } from "@/layout/instructor"
import { InstructorCurriculumPageComponent } from "@/page-component"
import { InstructorService } from "@/services/instructor.service"
import { GetServerSideProps } from "next"

const CurriculumPage = () => {
  return <InstructorCurriculumPageComponent />
}

export default withInstructorLayout(CurriculumPage)

export const getServerSideProps: GetServerSideProps<CoursesPageType> = async ({ req, query }) => {
	const course = await InstructorService.getDetailedCourse(req.cookies.refresh, query.slug as string)

	return {
		props: {course}
	}
}

interface CoursesPageType extends Record<string, unknown> {
	course: CourseType
}