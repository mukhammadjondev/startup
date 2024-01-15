import { withLayout } from "@/layout/layout"
import Seo from "@/layout/seo/seo"
import { CoursesPageComponent } from "@/page-component"
import { useTranslation } from "react-i18next"

const Courses = () => {
  const { t } = useTranslation()

  return (
    <Seo
			metaTitle={`MuhsDev | ${t('course_page_title', { ns: 'seo' })}` || 'MuhsDev | All Courses'}
			metaDescription={
				`MuhsDev | ${t('course_page_description', { ns: 'seo' })}` ||
				'All courses in MuhsDev platform just learn and relax'
			}
		>
			<CoursesPageComponent />
		</Seo>
  )
}

export default withLayout(Courses)