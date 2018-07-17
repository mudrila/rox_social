import { combineReducers } from 'redux-immutable'
import UserReducer from '../../../AuthorizedUserApp/Pages/Home/redux/reducer'
import FriendsPageReducer from '../../../AuthorizedUserApp/Pages/Friends/redux/reducer'
export const RootReducer = combineReducers({
  user: UserReducer,
  usersSearchResult: FriendsPageReducer
});
