import React, { Component, Fragment } from 'react'
import Routes from './Routes'
import Header from '../../../PagesParts/UnauthorizedUserPagesParts/Header/Header'
import Footer from '../../../PagesParts/General/Footer/Footer'
import './main.scss'
class UnauthorizedApp extends Component {
  render () {
    return (
      <Fragment>
        <Header/>
        <main className='b-main-container unauthorized-content'>
          <Routes/>
        </main>
        <Footer/>
      </Fragment>
    )
  }
}
export default UnauthorizedApp
