import { BooksType } from '@/interfaces/books.interface';
import { CourseType } from '@/interfaces/course.interface';

export const getTotalPrice = (
  courses: CourseType[],
  books: BooksType[]
): number => {
  const booksPrice = books.reduce((total, item) => total + item.price, 0);
  const coursesPrice = courses.reduce((total, item) => total + item.price, 0);
  const totalPrice = booksPrice + coursesPrice;
  return totalPrice;
};

export const getPriceFormatted = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
