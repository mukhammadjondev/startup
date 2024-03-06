import { ArticleType } from '@/interfaces/article.interface';
import { BooksType } from '@/interfaces/books.interface';
import { CardType, ProductsType } from '@/interfaces/constants.interface';
import { CourseType } from '@/interfaces/course.interface';
import { InstructorType } from '@/interfaces/instructor.interface';
import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export interface AppProviderProps {
  courses: CourseType[];
  course: CourseType;
  instructors: InstructorType[];
  books: BooksType[];
  cards: CardType[];
  products: ProductsType[];
  articles: ArticleType[];
  article: ArticleType;
}
