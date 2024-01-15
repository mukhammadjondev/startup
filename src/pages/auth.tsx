import Seo from "@/layout/seo/seo"
import { AuthPageComponent } from "@/page-component"
import { useTranslation } from "react-i18next"

const AuthPage = () => {
  const { t } = useTranslation()

  return (
    <Seo
			metaTitle={`MuhsDev | ${t('auth_page_title', { ns: 'seo' })}` || 'MuhsDev | Auth'}
			metaDescription={
				`MuhsDev | ${t('auth_page_description', { ns: 'seo' })}` ||
				'Login or create your account for using MuhsDev platform'
			}
		>
			<AuthPageComponent />
		</Seo>
  )
}

export default AuthPage