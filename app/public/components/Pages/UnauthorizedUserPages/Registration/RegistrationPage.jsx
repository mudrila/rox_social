import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import './main.scss'
export default class RegistrationPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formValues: {
        userName: '',
        userEmail: '',
        userPassword: '',
        userConfirmPassword: ''
      },
      formValid: false
    }
  }
  static propTypes = {
    registrationActions: PropTypes.shape({
      registerUserRequest: PropTypes.func
    })
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
    let formValid = document.forms['registration-form'].checkValidity()
    if (formValid === true) {
      // Browser validation passed - make custom validations
      if (this.state.formValues.userPassword !== this.state.formValues.userConfirmPassword) {
        formValid = false
      }
      if (this.state.formValid !== formValid) {
        this.setState({ formValid: formValid })
      }
    }
  }
  handleFormSubmit = (event) => {
    event.preventDefault()
    if (this.state.formValid === true) {
      this.props.registrationActions.registerUserRequest(this.state.formValues)
    }
  }
  render () {
    let { userName, userEmail, userPassword, userConfirmPassword } = this.state.formValues
    return (
      <form name='registration-form' className='b-registration-form'>
        <h1 className='b-registration-form__header'>Register to FreeSocial</h1>
        <section className='b-registration-form__form-group form-group'>
          <label className='b-registration-form__form-group__label_required' htmlFor='user-name'>Your name</label>
          <input required value={userName} name='userName' id='user-name' className='b-registration-form__form-group__input_required' placeholder='Type your name' onChange={this.handleInputChange}/>
        </section>
        <section className='b-registration-form__form-group form-group'>
          <label className='b-registration-form__form-group__label_required' htmlFor='user-email'>Your email</label>
          <input required type='email' value={userEmail} name='userEmail' id='user-email' className='b-registration-form__form-group__input_required' placeholder='Type your email' onChange={this.handleInputChange}/>
        </section>
        <section className='b-registration-form__form-group form-group'>
          <label className='b-registration-form__form-group__label_required' htmlFor='user-password'>Your password</label>
          <input required type='password' value={userPassword} name='userPassword' id='user-password' className='b-registration-form__form-group__input_required' placeholder='Type your password' onChange={this.handleInputChange}/>
        </section>
        <section className='b-registration-form__form-group form-group'>
          <label className='b-registration-form__form-group__label_required' htmlFor='user-confirm-password'>Confirm password</label>
          <input required type='password' value={userConfirmPassword} name='userConfirmPassword' id='user-confirm-password' className='b-registration-form__form-group__input_required' placeholder='Same password again' onChange={this.handleInputChange}/>
        </section>
        <section className='b-registration-form__form-group form-group b-form-control'>
          <Button color='primary' variant='outlined' onClick={this.handleFormSubmit} disabled={!this.state.formValid}>Submit</Button>
        </section>
      </form>
    )
  }
}
