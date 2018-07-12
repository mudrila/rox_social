import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import { faSignInAlt,faKey, faUserCircle  } from '@fortawesome/free-solid-svg-icons'
import TextField from '@material-ui/core/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
        <h3 className='b-login-form__header'>Sign In to Social Rox</h3>
        <TextField
          required
          label="Email"
          className='b-login-form__form-group'
          id='email'
          value={userEmail}
          onChange={this.handleInputChange}
          name={'userEmail'}
          type='email'
          autoComplete={'off'}
          margin={'dense'}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'}>
                <FontAwesomeIcon icon={faUserCircle}/>
              </InputAdornment>
            )
          }}
        />
        <TextField
          required
          className='b-login-form__form-group'
          type='password'
          margin={'dense'}
          id={'user-password'}
          name={'userPassword'}
          value={userPassword}
          onChange={this.handleInputChange}
          label={'Password'}
          autoComplete={'off'}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'}>
                <FontAwesomeIcon icon={faKey}/>
              </InputAdornment>
            )
          }}
        />
        <section className='b-login-form__form-group form-group b-form-control'>
          <Button className='b-login-form__form-group__e-button b-form-control__button' color='primary' variant='contained' onClick={this.handleFormSubmit} disabled={!this.state.formValid}>
            Submit
            <FontAwesomeIcon icon={faSignInAlt}/>
          </Button>
        </section>
      </form>
    )
  }
}
