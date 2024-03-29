import { API_URL, getInstructorUrl } from "@/config/api.config";
import { CourseType } from "@/interfaces/course.interface";
import { InstructorApplyBody } from "@/store/instructor/instructor.interface";
import axios from "axios";

export const InstructorService = {
  async applyInstructor(body: InstructorApplyBody) {
    const response = await axios.post<'Success'>(`${API_URL}${getInstructorUrl('apply')}`, body)

    return response.data
  },

  async getAllCourses(token?: string) {
    const response = await axios.get<CourseType[]>(`${API_URL}${getInstructorUrl('course-all')}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    return response.data
  },

  async getDetailedCourse(token?: string, slug?: string) {
    const response = await axios.get<CourseType>(`${API_URL}${getInstructorUrl(`course/${slug}`)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    return response.data
  },
}