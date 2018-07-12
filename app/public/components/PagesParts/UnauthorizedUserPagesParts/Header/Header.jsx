import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from '@material-ui/core/Toolbar'
import Typography from "@material-ui/core/Typography"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './main.scss'
export default class Header extends Component {
  render () {
    return (
      <AppBar position={'fixed'} className={'b-main-header'}>
        <Toolbar>
          <Typography color={'inherit'} variant='title'>Social Rox</Typography>
          <NavLink className='b-main-header__main-menu__menu-items-container__menu-item-container__menu-item' activeClassName={'active'} to={'/login'}>Login<FontAwesomeIcon icon={faSignInAlt}/> </NavLink>
          <NavLink className='b-main-header__main-menu__menu-items-container__menu-item-container__menu-item' activeClassName={'active'} to={'/registration'}>Sign Up <FontAwesomeIcon icon={faUserPlus}/></NavLink>
        </Toolbar>
      </AppBar>
    )
  }
}