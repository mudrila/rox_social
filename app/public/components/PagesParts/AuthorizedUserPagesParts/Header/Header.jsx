import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button'
import './main.scss'

export default class Header extends Component {
  static propTypes = {
    handleSignOut: PropTypes.func
  };
  handleSignOut = (event) => {
    event.preventDefault()
    this.props.handleSignOut()
  };
  render () {
    return (
      <header className='b-main-header unauthorized-header'>
        <div className='b-main-header__meta-container'>
          <FontAwesomeIcon icon={faUserFriends} color={'blue'}/>
          <span className='slogan'>Social Rox</span>
        </div>
        <nav className='b-main-header__main-menu'>
          <ul className='b-main-header__main-menu__menu-items-container'>
            <li className='b-main-header__main-menu__menu-items-container__menu-item-container'>
              <Button onClick={this.handleSignOut} className='b-main-header__main-menu__menu-items-container__menu-item-container__btn ' color='primary' variant='outlined'>Sign Out</Button>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}
