import { LessonType } from '@/interfaces/instructor.interface';

export interface LessonInitialStateType {
  isLoading: boolean;
  error: string | null | unknown;
  lesson: LessonType;
}

export interface LessonBodyType {
  callback: () => void;
  sectionId?: string;
  lessonId?: string;
}
