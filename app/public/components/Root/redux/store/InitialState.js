import {Map, List} from 'immutable'
const InitialState = Map({
  user: Map({
    name: '',
    uuid: '',
    accessToken: '',
    isAuthenticated: false,
    friends: List([])
  })
});
export default InitialState
