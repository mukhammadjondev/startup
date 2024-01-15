import { withLayout } from "@/layout/layout"
import Seo from "@/layout/seo/seo"
import { AboutPageComponent } from "@/page-component"
import { useTranslation } from "react-i18next"

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <Seo
			metaTitle={`MuhsDev | ${t('about_page_title', { ns: 'seo' })}` || 'MuhsDev | About us'}
			metaDescription={
				`MuhsDev | ${t('about_page_description', { ns: 'seo' })}` ||
				'Main information about MuhsDev platform'
			}
		>
			<AboutPageComponent />
		</Seo>
  )
}

export default withLayout(AboutPage)