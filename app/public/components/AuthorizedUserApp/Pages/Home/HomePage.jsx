import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { APIUrl } from '../../../Root/redux/middlewares/APIServiceBases'
import Button from '@material-ui/core/Button'
import './styles/main.scss'
import './styles/adaptive.scss'

export default class HomePage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      formDisabled: true,
      userDataFormValues: {
        userName: this.props.user.name,
        userEmail: this.props.user.email,
        userUuid: this.props.user.uuid,
        userAvatar: ''
      }
    };
    document.title = 'Profile | Social Rox'
  }
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      uuid: PropTypes.string,
      email: PropTypes.string,
      isAuthenticated: PropTypes.bool
    }),
    userActions: PropTypes.shape({
      loginRequest: PropTypes.func,
      logoutRequest: PropTypes.func,
      login: PropTypes.func,
      logout: PropTypes.func,
      uploadAvatar: PropTypes.func
    })
  };
  handleAvatarUpload = (event) => {
    event.preventDefault();
    let fileFormData = new FormData();
    fileFormData.append('avatar', this.state.userDataFormValues.userAvatar);
    if (this.state.userDataFormValues.userAvatar) {
      this.props.userActions.uploadAvatar(this.props.user.uuid, fileFormData)
    }
  };
  toggleUserDataForm = () => {
    this.setState({formDisabled: !this.state.formDisabled})
  };
  handleUserDataFormSubmit = (event) => {
    event.preventDefault()
  };
  handleUserDataInputChange = (event) => {
    if (event.target.name === 'userAvatar') {
      // Save file to state
      this.setState({
        userDataFormValues: {
          ...this.state.userDataFormValues,
          [event.target.name]: event.target.files[0]
        }
      })
    } else {
      this.setState({
        userDataFormValues: {
          ...this.state.userDataFormValues,
          [event.target.name]: event.target.value
        }
      })
    }
  };
  render () {
    let {formDisabled, userDataFormValues} = this.state;
    const UserDataFormButton = () => {
      if (formDisabled === true) {
        return <Button color='primary' variant='outlined' onClick={this.toggleUserDataForm}>Edit</Button>
      } else {
        return <Button color='primary' variant='outlined' onClick={this.handleUserDataFormSubmit}>Submit</Button>
      }
    };
    return (
      <article className='b-user-page'>
        <section className='b-user-page__b-user-avatar b-card'>
          <img src={`${APIUrl}user/${this.props.user.uuid}/avatar/`} />
          <fieldset className='b-user-page__b-user-avatar__form__b-form-group'>
            <label className='b-user-page__b-user-avatar__form__b-form-group__label'>Upload your avatar</label>
            <input onChange={this.handleUserDataInputChange} className='b-user-page__b-user-avatar__form__b-form-group__input' type='file' name='userAvatar' accept="image/*"/>
            <Button className='b-user-page__b-user-avatar__form__b-form-group__button' color='primary' variant='outlined' onClick={this.handleAvatarUpload}>Submit</Button>
          </fieldset>
        </section>
        <section className='b-user-page__b-user-data b-card'>
          <form id='user-data' name='user-data' className='b-user-page__b-user-data__form' onSubmit={this.handleUserDataFormSubmit}>
            <fieldset className='b-user-page__b-user-data__form__b-form-group'>
              <label className='b-user-page__b-user-data__form__b-form-group__label'>Name</label>
              <input onChange={this.handleUserDataInputChange} className='b-user-page__b-user-data__form__b-form-group__input' disabled={formDisabled} name='userName' value={userDataFormValues.userName}/>
            </fieldset>
            <fieldset className='b-user-page__b-user-data__form__b-form-group'>
              <label className='b-user-page__b-user-data__form__b-form-group__label'>Email</label>
              <input onChange={this.handleUserDataInputChange} className='b-user-page__b-user-data__form__b-form-group__input' disabled={formDisabled} name='userEmail' value={userDataFormValues.userEmail}/>
            </fieldset>
            <fieldset className='b-user-page__b-user-data__form__b-form-group'>
              <label className='b-user-page__b-user-data__form__b-form-group__label'>ID</label>
              <input onChange={this.handleUserDataInputChange} className='b-user-page__b-user-data__form__b-form-group__input' disabled={formDisabled} name='userUuid' value={userDataFormValues.userUuid}/>
            </fieldset>
            <UserDataFormButton />
          </form>
        </section>
        <section className='b-user-page__b-friends-list b-card'>Your friends</section>
      </article>
    )
  }
}
