import { put, takeEvery } from 'redux-saga/effects'
import { SEARCH_REQUEST } from "./actionTypes"
import * as APIService from './apiService'
import { getSearchResult } from './actions'

const searchRequestWorker = function * (action) {
  const searchResults = yield APIService.search(action.name);
  if (searchResults.success) {
    yield put(getSearchResult(searchResults.items))
  }
};

export const watchFriendsPageSaga = function * () {
  yield takeEvery(SEARCH_REQUEST, searchRequestWorker)
};
