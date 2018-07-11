import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginRequest } from '../../AuthorizedUserPages/User/redux/actions'
import LoginPage from './LoginPage'

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (userCredentials) => { dispatch(loginRequest(userCredentials)) }
  }
}
export default withRouter(connect(null, mapDispatchToProps)(LoginPage))
