import $axios from "@/api/axios"
import { API_URL, getAdminUrl, getCourseUrl } from "@/config/api.config"
import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"
import axios from "axios"

export const AdminService = {
  async getAllCourses() {
    const { data } = await axios.get<CourseType[]>(`${API_URL}${getCourseUrl('admin-all-courses')}`)
    return data
  },

  async getAllInstructors(token?: string) {
    const {data} = await axios.get<InstructorType[]>(`${API_URL}${getAdminUrl('all-instructors')}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  },

  async approveInstructor(instructorId: string) {
    const {data} = await $axios.put<'Success'>(`${getAdminUrl('approve-instructor')}`, {instructorId})
    return data
  },

  async deleteInstructor(instructorId: string) {
    const {data} = await $axios.put<'Success'>(`${getAdminUrl('approve-instructor')}`, {instructorId})
    return data
  },
}