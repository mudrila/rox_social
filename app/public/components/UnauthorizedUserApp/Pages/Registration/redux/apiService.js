import { basePostRequest } from '../../../../Root/redux/middlewares/APIServiceBases'

export const registerUserRequest = function (user) {
  return basePostRequest('user/registration', {
    name: user.userName,
    email: user.userEmail,
    password: user.userPassword,
    confirmPassword: user.userConfirmPassword
  })
}
