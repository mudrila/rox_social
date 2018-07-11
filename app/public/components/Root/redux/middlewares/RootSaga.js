import { all } from 'redux-saga/effects'
import { watchUserSaga } from '../../../Pages/AuthorizedUserPages/User/redux/saga'
import { watchRegistrationSaga } from '../../../Pages/UnauthorizedUserPages/Registration/redux/saga'

/**
 * @function RootSaga - something like `combineReducers`: take watchers of all components, which attached to store and run this watchers.
 * You can safely  develop all redux stuff for some component until you will this component's saga to this function and component's reducer to `RootReducer`
 */
export const RootSaga = function * () {
  yield all([
    watchUserSaga(),
    watchRegistrationSaga()
  ])
}
