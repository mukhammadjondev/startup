import { ArticleType } from "@/interfaces/article.interface";

export interface ArticlePageComponentProps {
  articles: ArticleType[]
}

export interface ArticleDetailedComponentProps {
  article: ArticleType
}