import { withLayout } from "@/layout/layout"
import Seo from "@/layout/seo/seo"
import { FaqPageComponent } from "@/page-component"
import { useTranslation } from "react-i18next"

const FaqPage = () => {
  const { t } = useTranslation()

  return (
    <Seo
			metaTitle={`MuhsDev | ${t('faq_page_title', { ns: 'seo' })}` || 'MuhsDev | FAQ'}
			metaDescription={
				`MuhsDev | ${t('faq_page_description', { ns: 'seo' })}` ||
				'More users in MuhsDev platform frequently asked question'
			}
		>
			<FaqPageComponent />
		</Seo>
  )
}

export default withLayout(FaqPage)