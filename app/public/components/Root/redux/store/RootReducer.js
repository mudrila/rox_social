import { combineReducers } from 'redux-immutable'
import UserReducer from '../../../AuthorizedUserApp/Pages/User/redux/reducer'

export const RootReducer = combineReducers({
  user: UserReducer
});
