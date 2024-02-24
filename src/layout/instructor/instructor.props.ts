import { CourseType } from '@/interfaces/course.interface';
import { BalanceType } from '@/interfaces/instructor.interface';

export interface InstructorProviderProps {
  courses: CourseType[];
  course: CourseType;
  balance: BalanceType;
}
