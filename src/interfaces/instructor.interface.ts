export interface InstructorType {
  firstName: string
  lastName: string
  email: string
  socialMedia: string
}

export interface SectionType {
  _id: string
  title: string
  lessons: []
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