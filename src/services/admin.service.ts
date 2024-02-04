import { API_URL, getCourseUrl } from "@/config/api.config"
import { CourseType } from "@/interfaces/course.interface"
import axios from "axios"

export const AdminService = {
  async getAllCourses() {
    const { data } = await axios.get<CourseType[]>(`${API_URL}${getCourseUrl('admin-all-courses')}`)
    return data
  }
}