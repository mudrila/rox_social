import { all } from 'redux-saga/effects'
import { watchUserSaga } from '../../../AuthorizedUserApp/Pages/Home/redux/saga'
import { watchRegistrationSaga } from '../../../UnauthorizedUserApp/Pages/Registration/redux/saga'
import { watchFriendsPageSaga } from '../../../AuthorizedUserApp/Pages/Friends/redux/saga'
/**
 * @function RootSaga - something like `combineReducers`: take watchers of all components, which attached to store and run this watchers.
 * You can safely  develop all redux stuff for some component until you will this component's saga to this function and component's reducer to `RootReducer`
 */
export const RootSaga = function * () {
  yield all([
    watchUserSaga(),
    watchRegistrationSaga(),
    watchFriendsPageSaga()
  ])
};
