import { useActions } from '@/hooks/useActions';
import { BooksType } from '@/interfaces/books.interface';
import { CourseType } from '@/interfaces/course.interface';
import { InstructorType } from '@/interfaces/instructor.interface';
import { UserType } from '@/interfaces/user.interface';
import { FC, ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
  courses: CourseType[];
  instructors: InstructorType[];
  users: UserType[];
  books: BooksType[];
}

const AdminProvider: FC<Props> = ({
  children,
  courses,
  instructors,
  users,
  books,
}): JSX.Element => {
  const { getAdminCourses, getAdminInstructors, getAdminUsers, getBooks } =
    useActions();

  useEffect(() => {
    if (courses?.length) {
      getAdminCourses(courses);
    }
    if (instructors?.length) {
      getAdminInstructors(instructors);
    }
    if (users?.length) {
      getAdminUsers(users);
    }
    if (books?.length) {
      getBooks(books);
    }
  }, [courses, instructors, users, books]);

  return <>{children}</>;
};

export default AdminProvider;
