import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import HomePageContainer from '../Pages/Home/HomePageContainer'
import FriendsPageContainer from "../Pages/Friends/FriendsPageContainer"
import UserPage from '../Pages/User/UserPage'
class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact={true} path='/' component={HomePageContainer}/>
        <Route path='/peoples' component={FriendsPageContainer}/>
        <Route path='/users/:uuid' component={UserPage}/>
        <Redirect to='/'/>
      </Switch>
    )
  }
}
export default withRouter(Routes)
