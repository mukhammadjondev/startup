import { ArticleType } from "@/interfaces/article.interface";
import { Language } from "@/interfaces/constants.interface";
import { gql, request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string

export const Articles = {
  async getArticles(lng: Language) {
    const query = gql`
      query Articles($lng: Language) {
        articles(where: {language: $lng}) {
          createdAt
          id
          title
          excerpt
          slug
          author {
            name
            avatar {
              url
            }
          }
          language
          description {
            text
            raw
          }
          image {
            url
          }
        }
      }
    `

    const result = await request<{ articles: ArticleType[] }>(graphqlAPI, query, {lng})
    return result.articles
  },

  async getDetailedArticle(slug: string) {
		const query = gql`
			query DeatiledArticle($slug: String!) {
				article(where: { slug: $slug }) {
					createdAt
					id
					title
					excerpt
					slug
					image {
						url
					}
					language
					author {
						name
						avatar {
							url
						}
					}
					description {
						text
						raw
					}
				}
			}
		`

		const result = await request<{ article: ArticleType }>(graphqlAPI, query, { slug })
		return result.article
	},
}