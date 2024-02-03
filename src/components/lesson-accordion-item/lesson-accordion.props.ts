import { LessonType } from "@/interfaces/instructor.interface";

export interface LessonAccordionProps {
  lesson: LessonType
  lessonIdx: number
  sectionId: string
}