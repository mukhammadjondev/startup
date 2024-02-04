export interface InstructorType {
  fullName: string
  avatar: string
  job: string
  totalCourses: number
  studentsCount: number
}

export interface SectionType {
  _id: string
  title: string
  lessons: LessonType[]
}

export interface LessonType {
  _id: string
  name: string
  material: string
  embedVideo: string
  hour: number
  minute: number
  second: number
}