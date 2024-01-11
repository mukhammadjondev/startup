import { ArticleType } from "@/interfaces/article.interface"
import { Language } from "@/interfaces/constants.interface"
import { withLayout } from "@/layout/layout"
import { ArticlePageComponent } from "@/page-component"
import { Articles } from "@/services/article.services"
import { GetServerSideProps } from "next"

const ArticlePage = ({articles}: ArticlePageProps) => {
  return <ArticlePageComponent articles={articles} />
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