import { makeActionCreator } from '../../../../../utils/actionCreator'
import {LOGIN_REQUEST, LOGOUT_REQUEST, LOGIN, LOGOUT, UPLOAD_AVATAR, GET_CURRENT_USER_DATA_REQUEST, GET_CURRENT_USER_DATA} from './actionTypes'

export const loginRequest = makeActionCreator(LOGIN_REQUEST, 'userCredentials');
export const getCurrentUserDataRequest = makeActionCreator(GET_CURRENT_USER_DATA_REQUEST);
export const getCurrentUserData = makeActionCreator(GET_CURRENT_USER_DATA, 'user');
export const login = makeActionCreator(LOGIN, 'user');
export const logoutRequest = makeActionCreator(LOGOUT_REQUEST, 'user');
export const logout = makeActionCreator(LOGOUT);
export const uploadAvatar = makeActionCreator(UPLOAD_AVATAR, 'userID', 'userAvatar');
