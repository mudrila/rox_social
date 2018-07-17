import {Map, Set} from 'immutable'
const InitialState = Map({
  user: Map({
    name: '',
    uuid: '',
    accessToken: '',
    isAuthenticated: false,
    friends: Set([])
  }),
  usersSearchResult: Set([])
});
export default InitialState
