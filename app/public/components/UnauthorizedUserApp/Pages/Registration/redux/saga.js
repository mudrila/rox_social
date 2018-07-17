import { takeEvery, put } from 'redux-saga/effects'
import { REGISTER_USER_REQUEST } from './actionTypes'
import { loginRequest } from '../../../../AuthorizedUserApp/Pages/User/redux/actions'
import * as APIService from './apiService'

const registerUserWorker = function * (action) {
  const registrationResult = yield APIService.registerUserRequest(action.user)
  if (registrationResult.success === true) {
    yield put(
      loginRequest({
        userEmail: action.user.userEmail,
        userPassword: action.user.userPassword
      })
    )
  }
}

export const watchRegistrationSaga = function * () {
  yield takeEvery(REGISTER_USER_REQUEST, registerUserWorker)
}
