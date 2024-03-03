export interface CourseType {
  previewImage: string;
  title: string;
  slug: string;
  lessonCount: number;
  totalHour: number;
  level: string;
  price: number;
  reviewAvg: number;
  reviewCount: number;
  author: AuthorType;
  learn: string[];
  requirements: string[];
  tags: string[];
  excerpt: string;
  description: string;
  category: string;
  _id: string;
  isActive: boolean;
  language: string;
  updatedAt: Date;
  allStudents: number;
}

export interface AuthorType {
  fullName: string;
  avatar: string;
  job: string;
}

export interface ReviewType {
  _id: string;
  author: AuthorType;
  updatedAt: Date;
  createAt: Date;
  rating: number;
  summary: string;
}
