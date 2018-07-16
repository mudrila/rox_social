import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AuthorizedUserApp from './AuthorizedUserApp/App'
import UnauthorizedUserApp from './UnauthorizedUserApp/App'
import './styles/main.scss'
import './styles/adaptive.scss'

export default class App extends Component {
  static propTypes = {
    user: PropTypes.shape({
      isAuthenticated: PropTypes.bool
    }),
    userActions: PropTypes.shape({
      loginRequest: PropTypes.func,
      logoutRequest: PropTypes.func
    })
  };
  render () {
    if (this.props.user.isAuthenticated === true) {
      return <AuthorizedUserApp userActions={this.props.userActions} user={this.props.user}/>
    } else {
      return <UnauthorizedUserApp />
    }
  }
}
