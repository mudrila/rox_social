import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { immutableComponentToJS } from '../../../utils/immutableComponentToJS'
import * as userActions from '../../AuthorizedUserApp/Pages/User/redux/actions'
import App from './App'

const mapStateToProps = (state) => {
  return {
    user: state.get('user')
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(immutableComponentToJS(App)))
