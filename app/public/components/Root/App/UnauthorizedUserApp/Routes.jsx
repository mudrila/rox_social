import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import RegistrationPageContainer from '../../../Pages/UnauthorizedUserPages/Registration/RegistrationPageContainer'
import LoginPageContainer from '../../../Pages/UnauthorizedUserPages/Login/LoginPageContainer'
class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route path='/registration' component={RegistrationPageContainer}/>
        <Route path='/login' component={LoginPageContainer}/>
        <Redirect to='/login'/>
      </Switch>
    )
  }
}
export default withRouter(Routes)
