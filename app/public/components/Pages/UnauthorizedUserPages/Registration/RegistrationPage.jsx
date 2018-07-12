import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import { faSignInAlt, faKey, faUser, faCheck, faAt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles/main.scss'
import './styles/adaptive.scss'

class RegistrationPage extends Component {
  constructor (props) {
    super(props);
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
  };
  handleInputChange = (event) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value
      },
    })
  };
  componentDidUpdate (prevProps, prevState, snapShot) {
    this.validateForm()
  }
  validateForm = () => {
    // Browser validation
    let formValid = document.forms['registration-form'].checkValidity();
    if (formValid === true) {
      // Browser validation passed - make custom validations
      if (this.state.formValues.userPassword !== this.state.formValues.userConfirmPassword) {
        formValid = false
      }
      if (this.state.formValid !== formValid) {
        this.setState({ formValid: formValid })
      }
    }
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.formValid === true) {
      this.props.registrationActions.registerUserRequest(this.state.formValues)
    }
  };
  render () {
    let { userName, userEmail, userPassword, userConfirmPassword } = this.state.formValues;
    return (
      <form name='registration-form' className='b-registration-form'>
        <h3 className='b-registration-form__header'>Register to Social Rox</h3>
        <TextField
          required
          label='Your name'
          value={userName}
          name='userName'
          id={'user-name'}
          className='b-registration-form__form-group'
          onChange={this.handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'}>
                <FontAwesomeIcon icon={faUser}/>
              </InputAdornment>
            )
          }}
        />
        <TextField
          required
          onChange={this.handleInputChange}
          className='b-registration-form__form-group'
          value={userEmail}
          type='email'
          id={'user-email'}
          name={'userEmail'}
          label={'Your email'}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'}>
                <FontAwesomeIcon icon={faAt}/>
              </InputAdornment>
            )
          }}
        />
        <TextField
          required
          onChange={this.handleInputChange}
          className='b-registration-form__form-group'
          value={userPassword}
          type={'password'}
          id={'user-password'}
          name={'userPassword'}
          label={'Your password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'}>
                <FontAwesomeIcon icon={faKey}/>
              </InputAdornment>
            )
          }}
        />
        <TextField
          required
          onChange={this.handleInputChange}
          className='b-registration-form__form-group'
          value={userConfirmPassword}
          type={'password'}
          id={'user-confirm-password'}
          name={'userConfirmPassword'}
          label={'Confirm password'}
          placeholder={'Same password again'}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'}>
                <FontAwesomeIcon icon={faCheck}/>
              </InputAdornment>
            )
          }}
        />
        <section className='b-registration-form__form-group form-group b-form-control'>
          <Button className={'b-form-control__button'} color='primary' variant='contained' onClick={this.handleFormSubmit} disabled={!this.state.formValid}>Submit <FontAwesomeIcon icon={faSignInAlt}/></Button>
        </section>
      </form>
    )
  }
}

export default RegistrationPage