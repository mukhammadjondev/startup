import * as userActions from './user/user.action'
import * as instructorActions from './instructor/instructor.action'
import { userSliceAction } from './user/user.slice'
import { instructorSliceAction } from './instructor/instructor.slice'

export const allActions = { ...userActions, ...userSliceAction, ...instructorActions, ...instructorSliceAction }