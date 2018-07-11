import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import './main.scss'
export default class Header extends Component {
  render () {
    return (
      <header className='b-main-header unauthorized-header'>
        <div className='b-main-header__meta-container'>
          <FontAwesomeIcon icon={faUserFriends} color={'red'}/>
          <span className='slogan'>Free Social connect</span>
        </div>
        <nav className='b-main-header__main-menu'>
          <ul className='b-main-header__main-menu__menu-items-container'>
            <li className='b-main-header__main-menu__menu-items-container__menu-item-container'>
              <NavLink className='b-main-header__main-menu__menu-items-container__menu-item-container__menu-item' activeClassName={'active'} to={'/login'}>Sign In</NavLink>
            </li>
            <li className='b-main-header__main-menu__menu-items-container__menu-item-container'>
              <NavLink className='b-main-header__main-menu__menu-items-container__menu-item-container__menu-item' activeClassName={'active'} to={'/registration'}>Sign Up</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}
