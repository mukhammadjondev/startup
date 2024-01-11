export interface ArticleType {
  createdAt: string;
  excerpt: string;
  id: string;
  image: {
    url: string;
  };
  slug: string;
  title: string;
  language: string;
  author: AuthorType;
  description: {
    text: string;
    raw: [];
  };
}

export interface AuthorType {
  name: string;
  avatar: {
    url: string;
  };
}