import { makeActionCreator } from "../../../../../utils/actionCreator";
import {SEARCH_REQUEST, GET_SEARCH_RESULTS, SUBSCRIBE_REQUEST} from "./actionTypes";

export const searchRequest = makeActionCreator(SEARCH_REQUEST, 'name');
export const getSearchResult = makeActionCreator(GET_SEARCH_RESULTS, 'items');
export const subscribeRequest = makeActionCreator(SUBSCRIBE_REQUEST, 'userID');