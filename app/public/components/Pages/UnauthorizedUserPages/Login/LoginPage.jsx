import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import './main.scss'

export default class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formValues: {
        userEmail: '',
        userPassword: ''
      },
      formValid: false
    }
  }
  static propTypes = {
    loginRequest: PropTypes.func
  }
  handleInputChange = (event) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value
      },
    })
  }
  componentDidUpdate (prevProps, prevState, snapShot) {
    this.validateForm()
  }
  validateForm = () => {
    // Browser validation
    let formValid = document.forms['login-form'].checkValidity()
    if (this.state.formValid !== formValid) {
      this.setState({ formValid: formValid })
    }
  }
  handleFormSubmit = (event) => {
    event.preventDefault()
    if (this.state.formValid === true) {
      this.props.loginRequest(this.state.formValues)
    }
  }
  render () {
    let { userEmail, userPassword } = this.state.formValues
    return (
      <form name='login-form' className='b-login-form'>
        <h1 className='b-login-form__header'>Sign In to FreeSocial</h1>
        <section className='b-login-form__form-group form-group'>
          <label className='b-login-form__form-group__label_required' htmlFor='user-email'>Your email</label>
          <input required type='email' value={userEmail} name='userEmail' id='user-email' className='b-login-form__form-group__input_required' placeholder='Type your email' onChange={this.handleInputChange}/>
        </section>
        <section className='b-login-form__form-group form-group'>
          <label className='b-login-form__form-group__label_required' htmlFor='user-password'>Your password</label>
          <input required type='password' value={userPassword} name='userPassword' id='user-password' className='b-login-form__form-group__input_required' placeholder='Type your password' onChange={this.handleInputChange}/>
        </section>
        <section className='b-login-form__form-group form-group b-form-control'>
          <Button className='b-form-control__button' color='primary' variant='outlined' onClick={this.handleFormSubmit} disabled={!this.state.formValid}>Submit</Button>
        </section>
      </form>
    )
  }
}
