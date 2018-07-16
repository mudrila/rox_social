import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import Routes from './Routes'
import Header from '../../../PagesParts/AuthorizedUserPagesParts/Header/Header'
import './main.scss'

const styles = {
  content: {
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

export default withStyles(styles)(AuthorizedApp)