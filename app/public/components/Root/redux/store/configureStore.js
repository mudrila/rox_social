import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { loadPersistedState, saveStateToLocalStorage } from './localStorage'

import {RootReducer} from './RootReducer'
import {RootSaga} from '../middlewares/RootSaga'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'

/**
 * @function configureStore - create redux store, apply middleware (composed reducer and saga), run saga middleware.
 * Also, it will persist redux state(or it's part) in browser local storage
 * @param history
 * @returns {Store<any>}
 */
const configureStore = (history) => {
  const persistedState = fromJS(loadPersistedState())
  const sagaMiddleware = createSagaMiddleware()
  const RouterMiddleware = routerMiddleware(history)
  const middlewares = [sagaMiddleware, RouterMiddleware]
  const storeEnhancer = compose(applyMiddleware(...middlewares))
  const connectedReducer = connectRouter(history)(RootReducer)
  let store = createStore(connectedReducer, persistedState, storeEnhancer)
  sagaMiddleware.run(RootSaga)
  store.subscribe(() => {
    let storeState = store.getState().toJS()
    saveStateToLocalStorage({
      user: storeState.user
    })
  })
  return store
}
export default configureStore
