import React, { Component, Fragment } from 'react'
import Routes from './Routes'
import Header from '../PagesParts/Header/Header'
import './styles/main.scss'
import './styles/adaptive.scss'
class UnauthorizedApp extends Component {
  render () {
    return (
      <Fragment>
        <Header/>
        <main className='b-main-container unauthorized-content'>
          <Routes/>
        </main>
      </Fragment>
    )
  }
}
export default UnauthorizedApp
