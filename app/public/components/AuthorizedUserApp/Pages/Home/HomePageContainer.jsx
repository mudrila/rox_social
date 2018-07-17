import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { immutableComponentToJS } from '../../../../utils/immutableComponentToJS'
import * as userActions from './redux/actions'
import HomePage from './HomePage'

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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(immutableComponentToJS(HomePage)))
