import { basePostRequest, baseFileUploadRequest } from '../../../../../../shared/baseRequest/index'

export const loginRequest = function (userCredentials) {
  return basePostRequest('user/login', {
    email: userCredentials.userEmail,
    password: userCredentials.userPassword
  })
};
export const uploadAvatar = function (userID, userAvatar) {
  return baseFileUploadRequest(`user/${userID}/avatar/`, userAvatar)
};
