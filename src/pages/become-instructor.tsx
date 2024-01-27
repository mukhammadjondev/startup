import { withLayout } from "@/layout/layout"
import Seo from "@/layout/seo/seo"
import { BecomeInstructorPageComponent } from "@/page-component"
import { NextPage } from "next"
import { useTranslation } from "react-i18next"

const BecomeInstructor: NextPage = () => {
  const { t } = useTranslation()

  return (
		<Seo
      metaTitle={`${t('become_instructor_page_title', { ns: 'seo' })}` || 'Become an instructor'}
      metaDescription={
				`${t('become_instructor_page_description', { ns: 'seo' })}` ||
				'Join one of the world’s largest online learning marketplaces and change your own lives.'
			}
    >
			<BecomeInstructorPageComponent />
		</Seo>
	)
}

export default withLayout(BecomeInstructor)