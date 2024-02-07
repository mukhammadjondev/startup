import { BooksType } from "@/interfaces/books.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBooks, deleteBooks, updateBooks } from "./books.action";
import { BooksInitialStateType } from "./books.interface";

const initialState: BooksInitialStateType = {
  isLoading: false,
  error: null,
  books: [],
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearBooksError: state => {
      state.error = null
    },
    startBooksLoading: state => {
      state.isLoading = true
    },
    getBooks: (state, action: PayloadAction<BooksType[]>) => {
      state.books = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createBooks.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createBooks.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.error = null
        state.books = [...state.books, payload]
      })
      .addCase(createBooks.rejected, (state, {payload}) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(deleteBooks.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteBooks.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.error = null
        const newArr = state.books.filter(c => c._id !== payload._id)
        state.books = newArr
      })
      .addCase(deleteBooks.rejected, (state, {payload}) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(updateBooks.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateBooks.fulfilled, (state, {payload}) => {
        state.isLoading = false
        state.error = null
        const newArr = state.books.map(item => {
					if (item._id === payload._id) {
						return payload
					}
					return item
				})
				state.books = newArr
      })
      .addCase(updateBooks.rejected, (state, {payload}) => {
        state.isLoading = false
        state.error = payload
      })
  }
})

export const booksReducer = booksSlice.reducer
export const booksSliceAction = booksSlice.actions