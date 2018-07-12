import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import './main.scss'

export default class LoginPage extends Component {
  constructor (props) {
    super(props);
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
    let formValid = document.forms['login-form'].checkValidity();
    if (this.state.formValid !== formValid) {
      this.setState({ formValid: formValid })
    }
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.formValid === true) {
      this.props.loginRequest(this.state.formValues)
    }
  };
  render () {
    let { userEmail, userPassword } = this.state.formValues;
    return (
      <form name='login-form' className='b-login-form' autoComplete={'off'}>
        <h1 className='b-login-form__header'>Sign In to FreeSocial</h1>
        <TextField
          required
          label="Email"
          className='b-login-form__form-group mdc-text-field--outlined'
          id='email'
          value={userEmail}
          onChange={this.handleInputChange}
          name={'userEmail'}
          type='email'
          variant={'outlined'}
          autoComplete={'off'}
        />
        <TextField
          required
          className='b-login-form__form-group mdc-text-field--outlined'
          type='password'
          id={'user-password'}
          name={'userPassword'}
          value={userPassword}
          onChange={this.handleInputChange}
          label={'Password'}
          autoComplete={'off'}
        />
        <section className='b-login-form__form-group form-group b-form-control'>
          <Button className='b-login-form__form-group b-form-control__button' color='primary' variant='outlined' onClick={this.handleFormSubmit} disabled={!this.state.formValid}>Submit</Button>
        </section>
      </form>
    )
  }
}
