import { BooksType } from "@/interfaces/books.interface"

export interface BooksModalProps {
  isOpen: boolean
  onClose: () => void
  booksValue: BooksType | null
}