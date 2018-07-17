import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { immutableComponentToJS } from '../../../../utils/immutableComponentToJS'
import FriendsPage from './FriendsPage'

const mapStateToProps = (state) => {
  return {
    user: state.get('user')
  }
};

const FriendsPageContainer = connect(mapStateToProps, null)(immutableComponentToJS(FriendsPage));

export default withRouter(FriendsPageContainer)