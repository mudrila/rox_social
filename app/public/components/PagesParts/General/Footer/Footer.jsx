import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faStackOverflow, faLinkedin, faReact, faReadme, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import immutableIcon from '../../../../assets/images/immutableJS'
import reduxIcon from '../../../../assets/images/reduxIcon.png'
import graphQLIcon from '../../../../assets/images/graph-ql-icon'
import './main.scss'

export default class Footer extends Component {
  handleLinkClick = (event) => {
    event.preventDefault()
    // Open in new tab
    window.open(event.target.href)
  }
  render () {
    return (
      <footer className='b-footer'>
        <section className='b-footer__b-about-author'>
          <h3 className='b-footer__b-about-author__header'>Author</h3>
          <a onClick={this.handleLinkClick} className='b-footer__b-about-author__link' href='https://github.com/mudrila'>GitHub <FontAwesomeIcon className='b-footer__b-about-author__link__icon' icon={faGithub} color={'grey'}/></a>
          <a onClick={this.handleLinkClick} className='b-footer__b-about-author__link' href='https://www.linkedin.com/in/kirill-klimenko-047428117/'>LinkedIn <FontAwesomeIcon className='b-footer__b-about-author__link__icon' icon={faLinkedin} color={'#3f51b5'}/></a>
          <a onClick={this.handleLinkClick} className='b-footer__b-about-author__link' href='https://ru.stackoverflow.com/users/241553/klimenkomud'>StackOverflow (RU) <FontAwesomeIcon className='b-footer__b-about-author__link__icon' icon={faStackOverflow} color={'#3f51b5'}/></a>
          <a onClick={this.handleLinkClick} className='b-footer__b-about-author__link' href='https://stackoverflow.com/users/8252978/klimenkomud'>StackOverflow (EN) <FontAwesomeIcon className='b-footer__b-about-author__link__icon' icon={faStackOverflow} color={'#fc7d36'}/></a>
        </section>
        <section className='b-footer__b-about-project'>
          <h3 className='b-footer__b-about-project__header'>About project</h3>
          <a onClick={this.handleLinkClick} className='b-footer__b-about-project__link' href='https://github.com/mudrila/social_network_example_frontend'>GitHub repository <FontAwesomeIcon className='b-footer__b-about-project__link__icon' icon={faGithub} color={'grey'}/></a>
          <a onClick={this.handleLinkClick} className='b-footer__b-about-project__link' href='https://github.com/mudrila/social_network_example_frontend/blob/master/README.md'>Documentation <FontAwesomeIcon className='b-footer__b-about-project__link__icon' icon={faReadme} color={'grey'}/></a>
        </section>
        <section className='b-footer__b-meta-info' >
          <h3 className='b-footer__b-meta-info__header'>Powered with</h3>
          <a style={{color: '#61dafb'}} onClick={this.handleLinkClick} className='b-footer__b-meta-info__link' href='https://reactjs.org/'>React <FontAwesomeIcon className='b-footer__b-about-project__link__icon' icon={faReact} color={'#61dafb'}/></a>
          <a style={{color: '#6F45BA'}} onClick={this.handleLinkClick} className='b-footer__b-meta-info__link' href='https://redux.js.org/'>Redux <img className='b-footer__b-about-project__link__icon' width='14px' height='14px' src={reduxIcon} alt={'Redux'}/></a>
          <a style={{color: 'rgb(252, 67, 73)'}} onClick={this.handleLinkClick} className='b-footer__b-meta-info__link' href='https://facebook.github.io/immutable-js/'>ImmutableJS {immutableIcon}</a>
          <a style={{color: '#E10098'}} onClick={this.handleLinkClick} className='b-footer__b-meta-info__link' href='https://graphql.org/'>GraphQL {graphQLIcon}</a>
          <a style={{color: '#009aeb'}} onClick={this.handleLinkClick} className='b-footer__b-meta-info__link' href='https://fontawesome.com/'>FontAwesome <FontAwesomeIcon className='b-footer__b-about-project__link__icon' icon={faFontAwesome} color={'#009aeb'} /></a>
        </section>
      </footer>
    )
  }
}
