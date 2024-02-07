import { BooksType } from "@/interfaces/books.interface"

export interface BooksInitialStateType {
  isLoading: boolean
  error: string | null | unknown
  books: BooksType[]
}

export interface ActionBody extends BooksType {
  callback: () => void
}

export interface DeleteBooksBody {
  callback: () => void
  bookId: string
}