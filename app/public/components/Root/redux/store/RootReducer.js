import { combineReducers } from 'redux-immutable'
import UserReducer from '../../../Pages/AuthorizedUserPages/User/redux/reducer'

export const RootReducer = combineReducers({
  user: UserReducer
});
