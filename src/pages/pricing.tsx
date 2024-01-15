import { withLayout } from "@/layout/layout"
import Seo from "@/layout/seo/seo"
import { PricingPageComponent } from "@/page-component"
import { useTranslation } from "react-i18next"

const PricingPage = () => {
  const { t } = useTranslation()

  return (
    <Seo
			metaTitle={`MuhsDev | ${t('pricing_page_title', { ns: 'seo' })}` || 'MuhsDev | Pricing Package'}
			metaDescription={
				`MuhsDev | ${t('pricing_page_description', { ns: 'seo' })}` ||
				'The best package for using and doing lesson on MuhsDev academy'
			}
		>
			<PricingPageComponent />
		</Seo>
  )
}

export default withLayout(PricingPage)