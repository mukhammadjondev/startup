import { ArticleType } from "@/interfaces/article.interface"
import { Language } from "@/interfaces/constants.interface"
import { withLayout } from "@/layout/layout"
import Seo from "@/layout/seo/seo"
import { ArticleDetailedComponent } from "@/page-component"
import { Articles } from "@/services/article.services"
import { GetServerSideProps } from "next"

const ArticleDetailedPage = ({article}: ArticleDetailedPageProps) => {
  return (
    <Seo metaTitle={article.title} metaDescription={article.excerpt}>
			<ArticleDetailedComponent article={article} />
		</Seo>
  )
}

export default withLayout(ArticleDetailedPage)

export const getServerSideProps: GetServerSideProps<ArticleDetailedPageProps> = async ({query, req}) => {
  const slug: string = query.slug as string
  const lng: Language = req.cookies.i18next as Language
  const article = await Articles.getDetailedArticle(slug)

  if(article.language == lng) {
    return {
      props: {
        article,
      }
    }
  }

  return {
    redirect: {
      destination: '/articles',
      permanent: false,
    }
  }
}

interface ArticleDetailedPageProps extends Record<string, unknown> {
  article: ArticleType
}