import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { immutableComponentToJS } from '../../../../utils/immutableComponentToJS'
import * as friendsPageActions from './redux/actions'
import FriendsPage from './FriendsPage'

const mapStateToProps = (state) => {
  return {
    user: state.get('user'),
    searchResult: state.get('usersSearchResult')
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    friendsPageActions: bindActionCreators(friendsPageActions, dispatch)
  }
};
const FriendsPageContainer = connect(mapStateToProps, mapDispatchToProps)(immutableComponentToJS(FriendsPage));

export default withRouter(FriendsPageContainer)