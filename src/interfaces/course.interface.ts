export interface CourseType {
  previewImage: string;
  title: string;
  slug: string;
  lessonCount: number;
  totalHour: number;
  level: string;
  price: number;
  reviewAvarage: number;
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
}

export interface AuthorType {
  fullName: string;
  avatar: string;
  job: string;
}
