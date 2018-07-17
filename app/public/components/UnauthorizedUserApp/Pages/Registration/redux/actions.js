import { makeActionCreator } from '../../../../../utils/actionCreator'
import { REGISTER_USER_REQUEST } from './actionTypes'

export const registerUserRequest = makeActionCreator(REGISTER_USER_REQUEST, 'user')
