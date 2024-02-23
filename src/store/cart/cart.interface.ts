import { BooksType } from '@/interfaces/books.interface';
import { ProductsType } from '@/interfaces/constants.interface';
import { CourseType } from '@/interfaces/course.interface';

export interface CartInitialState {
  books: BooksType[];
  courses: CourseType[];
  product: ProductsType;
}
