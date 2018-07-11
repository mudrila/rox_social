import {Map} from 'immutable'
const InitialState = Map({
  user: Map({
    name: '',
    uuid: '',
    accessToken: '',
    isAuthenticated: false
  })
})
export default InitialState
