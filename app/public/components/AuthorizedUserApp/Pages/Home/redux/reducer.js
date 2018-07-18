import { Map, Set } from 'immutable'
import {GET_CURRENT_USER_DATA, LOGIN, LOGOUT} from './actionTypes'

const UserReducer = (state = Map({}), action) => {
  switch (action.type) {
    case LOGIN:
      state = state
        .set('name', action.user.name)
        .set('uuid', action.user.uuid)
        .set('accessToken', action.user.token)
        .set('email', action.user.email)
        .set('isAuthenticated', true)
        .set('friends', Set(action.user.friends))
        .set('subscribers', Set(action.user.subscribers));
      return state;
    case GET_CURRENT_USER_DATA:
      state = state
        .set('name', action.user.name)
        .set('uuid', action.user.uuid)
        .set('email', action.user.email)
        .set('isAuthenticated', true)
        .set('friends', Set(action.user.friends))
        .set('subscribers', Set(action.user.subscribers));
      return state;
    case LOGOUT:
      return Map({});
    default:
      return state
  }
};
export default UserReducer
