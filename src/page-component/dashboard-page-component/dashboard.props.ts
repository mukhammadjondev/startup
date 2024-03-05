import { CardType } from '@/interfaces/constants.interface';
import { CourseType } from '@/interfaces/course.interface';
import { TransactionsType } from '@/interfaces/user.interface';
import { ReactNode } from 'react';

export interface StatusCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}

export interface TransactionsProps {
  transactions: TransactionsType[];
}

export interface MyCoursesProps {
  myCourses: CourseType[];
}

export interface SavedCardsProps {
  savedCards: CardType[];
}
