import { BooksType } from "@/interfaces/books.interface";
import { CourseType } from "@/interfaces/course.interface";
import { InstructorType } from "@/interfaces/instructor.interface";
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode
}

export interface AppProviderProps {
  courses: CourseType[]
  course: CourseType
  instructors: InstructorType[]
  books: BooksType[]
}