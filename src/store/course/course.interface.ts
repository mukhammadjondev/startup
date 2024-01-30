import { SubmitValuesInterface } from "@/components/instructor-manage-course/instructor-manage-course.props"

export interface CourseInitialStateType {
  isLoading: boolean
  error: string | null | unknown
}

export interface CourseCreateBodyInterface extends SubmitValuesInterface {
  callback: () => void
}