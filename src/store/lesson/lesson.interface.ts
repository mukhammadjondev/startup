export interface LessonInitialStateType {
  isLoading: boolean
  error: string | null | unknown
}

export interface LessonBodyType {
  callback: () => void
  sectionId?: string
  lessonId?: string
}