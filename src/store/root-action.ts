import * as userActions from './user/user.action'
import * as instructorActions from './instructor/instructor.action'
import * as courseActions from './course/course.action'
import * as sectionActions from './section/section.action'
import * as lessonActions from './lesson/lesson.action'
import * as adminActions from './admin/admin.action'
import * as booksActions from './books/books.action'
import { userSliceAction } from './user/user.slice'
import { instructorSliceAction } from './instructor/instructor.slice'
import { courseSliceAction } from './course/course.slice'
import { sectionSliceAction } from './section/section.slice'
import { lessonSliceAction } from './lesson/lesson.slice'
import { adminSliceAction } from './admin/admin.slice'
import { booksSliceAction } from './books/books.slice'
import { cartSliceAction } from './cart/cart.slice'

export const allActions = {
  ...userActions,
  ...userSliceAction,
  ...instructorActions,
  ...instructorSliceAction,
  ...courseActions,
  ...courseSliceAction,
  ...sectionActions,
  ...sectionSliceAction,
  ...lessonActions,
  ...lessonSliceAction,
  ...adminActions,
  ...adminSliceAction,
  ...booksSliceAction,
  ...booksActions,
  ...cartSliceAction,
}