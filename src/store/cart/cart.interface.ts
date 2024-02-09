import { BooksType } from "@/interfaces/books.interface";
import { CourseType } from "@/interfaces/course.interface";

export interface CartInitialState {
  books: BooksType[]
  courses: CourseType[]
}