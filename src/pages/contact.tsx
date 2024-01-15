import { withLayout } from "@/layout/layout"
import Seo from "@/layout/seo/seo"
import { ContactPageComponent } from "@/page-component"
import { useTranslation } from "react-i18next"

const ContactPage = () => {
  const { t } = useTranslation()

  return (
    <Seo
			metaTitle={`MuhsDev | ${t('contact_page_title', { ns: 'seo' })}` || 'MuhsDev | Contact us'}
			metaDescription={
				`MuhsDev | ${t('contact_page_description', { ns: 'seo' })}` ||
				'Contact with MuhsDev and you can ask any questions'
			}
		>
			<ContactPageComponent />
		</Seo>
  )
}

export default withLayout(ContactPage)