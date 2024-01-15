import { ArticleType } from "@/interfaces/article.interface"
import { Language } from "@/interfaces/constants.interface"
import { withLayout } from "@/layout/layout"
import Seo from "@/layout/seo/seo"
import { ArticlePageComponent } from "@/page-component"
import { Articles } from "@/services/article.services"
import { GetServerSideProps } from "next"
import { useTranslation } from "react-i18next"

const ArticlePage = ({articles}: ArticlePageProps) => {
  const { t } = useTranslation()

  return (
    <Seo
			metaTitle={`MuhsDev | ${t('article_page_title', { ns: 'seo' })}` || 'MuhsDev | Articles'}
			metaDescription={
				`MuhsDev | ${t('article_page_description', { ns: 'seo' })}` ||
				'Useful articles of MuhsDev'
			}
		>
			<ArticlePageComponent articles={articles} />
		</Seo>
  )
}

export default withLayout(ArticlePage)

export const getServerSideProps: GetServerSideProps<ArticlePageProps> = async ({req}) => {
  const lng: Language = req.cookies.i18next as Language
  const articles = await Articles.getArticles(lng)

  return {
    props: {
      articles
    }
  }
}

interface ArticlePageProps extends Record<string, unknown> {
  articles: ArticleType[]
}