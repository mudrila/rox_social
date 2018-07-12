import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import RegistrationPageContainer from '../../../Pages/UnauthorizedUserPages/Registration/RegistrationPageContainer'
import LoginPageContainer from '../../../Pages/UnauthorizedUserPages/Login/LoginPageContainer'
class Routes extends Component {
  render () {
    return (
      <Route render={( { location }) => (
        <TransitionGroup className={'b-transition-container'}>
          <CSSTransition key={location.key} classNames={'fade'} timeout={500}>
            <Switch location={location}>
              <Route path={'/'} exact render={() => <Redirect to={'/login'} /> }/>
              <Route path='/registration' component={RegistrationPageContainer}/>
              <Route path='/login' component={LoginPageContainer}/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}/>
    )
  }
}
export default withRouter(Routes)
