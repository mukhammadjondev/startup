import $axios from "@/api/axios"
import { API_URL, getAdminUrl, getCourseUrl } from "@/config/api.config"
import { CourseType } from "@/interfaces/course.interface"
import { InstructorType } from "@/interfaces/instructor.interface"
import { UserType } from "@/interfaces/user.interface"
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

  async getUsers(limit: string, token?: string) {
    const {data} = await axios.get(`${API_URL}${getAdminUrl('all-users')}`, {
      params: { limit },
      headers: {Authorization: `Bearer ${token}`}
    })
    return data
  },

  async searchUsers(query: string) {
    const {data} = await $axios.get<UserType[]>(`${getAdminUrl('search-users')}`, {params: {email: query, limit: 10}})
    return data
  },

  async deleteCourse(courseId: string) {
    const {data} = await $axios.delete<CourseType[]>(`${getAdminUrl('delete-course')}`, {params: {courseId}})
    return data
  },
}