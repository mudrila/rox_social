import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import Routes from './Routes'
import Header from '../PagesParts/Header/Header'
import './styles/main.scss'
import './styles/adaptive.scss'

const styles = {
  content: {
    minHeight: '100vh',
    flexGrow: 1,
    padding: '10vh 5% 0 1%',
  }
};
class AuthorizedApp extends Component {
  static propTypes = {
    user: PropTypes.shape({
      uuid: PropTypes.string,
      name: PropTypes.string
    }),
    userActions: PropTypes.shape({
      logoutRequest: PropTypes.func
    })
  };
  render () {
    const { classes } = this.props;
    return (
      <Fragment>
        <Header user={this.props.user} handleSignOut={this.props.userActions.logoutRequest}/>
        <main className={classNames('b-main-container authorized-content', classes.content)}>
          <Routes/>
        </main>
      </Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(AuthorizedApp))