import {Set} from 'immutable'
import { GET_SEARCH_RESULTS } from "./actionTypes"

const FriendsPageReducer = (state = Set([]), action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      state = Set(action.items);
      return state;
    default:
      return state
  }
};
export default FriendsPageReducer