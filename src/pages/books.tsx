import { withLayout } from "@/layout/layout"
import Seo from "@/layout/seo/seo"
import { BooksPageComponent } from "@/page-component"
import { useTranslation } from "react-i18next"

const Books = () => {
  const { t } = useTranslation()

  return (
    <Seo
			metaTitle={`MuhsDev | ${t('books_page_title', { ns: 'seo' })}` || 'MuhsDev | Books'}
			metaDescription={
				`MuhsDev | ${t('books_page_description', { ns: 'seo' })}` ||
				'MuhsDev can advice books for you'
			}
		>
			<BooksPageComponent />
		</Seo>
  )
}

export default withLayout(Books)