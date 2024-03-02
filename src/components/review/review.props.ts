import { ReviewType } from '@/interfaces/course.interface';

export interface ReviewProps {
  reviews: ReviewType[];
  isLoading: boolean;
}
