import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import UserPageContainer from '../Pages/User/UserPageContainer'
import FriendsPageContainer from "../Pages/Friends/FriendsPageContainer";
class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact={true} path='/' component={UserPageContainer}/>
        <Route path='/friends' component={FriendsPageContainer}/>
        <Redirect to='/'/>
      </Switch>
    )
  }
}
export default withRouter(Routes)
