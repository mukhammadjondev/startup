import { InstructorType } from "@/interfaces/instructor.interface";

export interface AdminInstructorTableProps {
  instructors: InstructorType[]
  approved: boolean
}