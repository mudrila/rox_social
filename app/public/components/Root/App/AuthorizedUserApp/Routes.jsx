import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import UserPageContainer from '../../../Pages/AuthorizedUserPages/User/UserPageContainer'
class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact={true} path='/' component={UserPageContainer}/>
        <Redirect to='/'/>
      </Switch>
    )
  }
}
export default withRouter(Routes)
