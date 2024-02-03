import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"
import { withLayout } from "@/layout/layout"
import Seo from "@/layout/seo/seo"
import { HomePageComponent } from "@/page-component"
import { AppService } from "@/services/app.service"
import { GetServerSideProps } from "next"
import { useTranslation } from "react-i18next"

const Home = () => {
  const { t } = useTranslation()

  return (
    <Seo metaTitle={`MuhsDev | ${t('main_page_title', {ns: 'seo'})}`} metaDescription={`${t('main_page_description', {ns: 'seo'})}`}>
      <HomePageComponent />
    </Seo>
  )
}

export default withLayout(Home)

export const getServerSideProps: GetServerSideProps<MainPageType> = async ({ req }) => {
	const response = await AppService.getMainPageSource(req.cookies.i18next)

	return {
		props: {courses: response.courses, instructors: response.instructors}
	}
}

interface MainPageType {
	courses: CourseType[]
  instructors: InstructorType[]
}