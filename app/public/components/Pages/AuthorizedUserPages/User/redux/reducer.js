import { Map } from 'immutable'
import { LOGIN, LOGOUT } from './actionTypes'

const UserReducer = (state = Map({}), action) => {
  switch (action.type) {
    case LOGIN:
      state = state
        .set('name', action.user.name)
        .set('uuid', action.user.uuid)
        .set('accessToken', action.user.token)
        .set('email', action.user.email)
        .set('isAuthenticated', true)
      return state
    case LOGOUT:
      return Map({})
    default:
      return state
  }
}
export default UserReducer
