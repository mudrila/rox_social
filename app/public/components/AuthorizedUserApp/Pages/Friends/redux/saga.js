import { put, takeEvery } from 'redux-saga/effects'
import {SEARCH_REQUEST, SUBSCRIBE_REQUEST} from "./actionTypes"
import * as APIService from './apiService'
import { getSearchResult } from './actions'

const searchRequestWorker = function * (action) {
  const searchResults = yield APIService.search(action.name);
  if (searchResults.success) {
    yield put(getSearchResult(searchResults.items))
  }
};
const subscribeRequestWorker = function * (action) {
  yield APIService.subscribe(action.userID)
};
export const watchFriendsPageSaga = function * () {
  yield takeEvery(SEARCH_REQUEST, searchRequestWorker);
  yield takeEvery(SUBSCRIBE_REQUEST, subscribeRequestWorker)
};
