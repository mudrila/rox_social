import { put, takeEvery } from 'redux-saga/effects'
import * as APIService from './apiService'
import {LOGIN_REQUEST, LOGOUT_REQUEST, UPLOAD_AVATAR} from './actionTypes'
import { login, logout } from './actions'
const loginWorker = function * (action) {
  const loginRequestResult = yield APIService.loginRequest(action.userCredentials);
  if (loginRequestResult.success === true) {
    yield put(login(loginRequestResult.user))
  }
};
const logoutWorker = function * () {
  yield put(logout())
};
const uploadAvatarWorker = function * (action) {
  const uploadAvatarRequestResult = yield APIService.uploadAvatar(action.userID, action.userAvatar);
  if (uploadAvatarRequestResult.success === true) {
    console.log('Uploaded :)')
  } else {
    console.log('Fail :(')
  }
};
export const watchUserSaga = function * () {
  yield takeEvery(LOGIN_REQUEST, loginWorker);
  yield takeEvery(LOGOUT_REQUEST, logoutWorker);
  yield takeEvery(UPLOAD_AVATAR, uploadAvatarWorker)
};
