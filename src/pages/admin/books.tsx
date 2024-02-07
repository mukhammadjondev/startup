import { BooksType } from "@/interfaces/books.interface"
import { withAdminLayout } from "@/layout/admin"
import { AdminBooksPageComponent } from "@/page-component"
import { BooksService } from "@/services/books.service"
import { GetServerSideProps } from "next"

const Books = () => {
  return <AdminBooksPageComponent />
}

export default withAdminLayout(Books)

export const getServerSideProps: GetServerSideProps<BooksPageType> = async () => {
	const books = await BooksService.get()

	return {
		props: {books}
	}
}

interface BooksPageType extends Record<string, unknown> {
	books: BooksType[]
}