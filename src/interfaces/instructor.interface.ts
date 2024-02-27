import { UserType } from './user.interface';

export interface InstructorType {
  fullName: string;
  avatar: string;
  job: string;
  totalCourses: number;
  studentsCount: number;
  socialMedia: string;
  approved: boolean;
  author: UserType;
  _id: string;
}

export interface SectionType {
  _id: string;
  title: string;
  lessons: LessonType[];
}

export interface LessonType {
  _id: string;
  name: string;
  material: string;
  embedVideo: string;
  hour: number;
  minute: number;
  second: number;
  completed: string[];
}

export interface BalanceType {
  available: AmountBalanceType[];
  instant_available: AmountBalanceType[];
  pending: AmountBalanceType[];
}

export interface AmountBalanceType {
  amount: number;
}
