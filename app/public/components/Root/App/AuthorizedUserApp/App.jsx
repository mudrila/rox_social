import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Routes from './Routes'
import Header from '../../../PagesParts/AuthorizedUserPagesParts/Header/Header'
import Footer from '../../../PagesParts/General/Footer/Footer'
import './main.scss'

export default class AuthorizedApp extends Component {
  static propTypes = {
    userActions: PropTypes.shape({
      logoutRequest: PropTypes.func
    })
  }
  render () {
    return (
      <Fragment>
        <Header handleSignOut={this.props.userActions.logoutRequest}/>
        <main className='b-main-container authorized-content'>
          <Routes/>
        </main>
        <Footer/>
      </Fragment>
    )
  }
}
