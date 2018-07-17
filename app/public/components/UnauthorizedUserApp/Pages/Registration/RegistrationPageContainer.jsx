import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as registrationActions from './redux/actions'
import RegistrationPage from './RegistrationPage'

const mapDispatchToProps = (dispatch) => {
  return {
    registrationActions: bindActionCreators(registrationActions, dispatch)
  }
}
export default withRouter(connect(null, mapDispatchToProps)(RegistrationPage))
