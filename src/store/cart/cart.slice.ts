import { BooksType } from '@/interfaces/books.interface';
import { CourseType } from '@/interfaces/course.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartInitialState } from './cart.interface';
import { ProductsType } from '@/interfaces/constants.interface';

const initialState: CartInitialState = {
  books: [],
  courses: [],
  product: {} as ProductsType,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addBookToCart: (state, { payload }: PayloadAction<BooksType>) => {
      state.books = [...state.books, payload];
    },
    addCourseToCart: (state, { payload }: PayloadAction<CourseType>) => {
      state.courses = [...state.courses, payload];
    },
    editCourseToCart: (state, { payload }: PayloadAction<CourseType[]>) => {
      state.courses = payload;
    },
    addProductToCart: (state, { payload }: PayloadAction<ProductsType>) => {
      state.product = payload;
    },
    removeBookFromCart: (state, { payload }: PayloadAction<string>) => {
      const newArr = state.books.filter(c => c._id !== payload);
      state.books = newArr;
    },
    removeCourseFromCart: (state, { payload }: PayloadAction<string>) => {
      const newArr = state.courses.filter(c => c._id !== payload);
      state.courses = newArr;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartSliceAction = cartSlice.actions;
