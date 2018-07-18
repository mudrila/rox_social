import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { APIUrl } from '../../../Root/redux/middlewares/APIServiceBases'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUpload, faAt, faFingerprint, faUserEdit , faUserCheck, faCheck} from '@fortawesome/free-solid-svg-icons'
import './styles/main.scss'
import './styles/adaptive.scss'

const styles = theme => ({
  userCard: {
    position: 'relative',
    width: 400
  },
  userPhoto: {
    paddingTop: '67.25%',
    height: 0,
    position: 'relative'
  },
  uploadAvatarLabel: {
    cursor: 'pointer'
  },
  avatarActions: {
    opacity: 0,
    transition: 'all 250ms linear',
    height: 0
  },
  avatarActionsActive: {
    opacity: 1,
    transition: 'all 250ms linear',
    height: 50
  },
  fileInput: {
    display: 'none'
  },
  userInput: {
    width: '100%',
    marginTop: 10
  },
  icon: {
    color: theme.palette.primary.main
  }
});
class HomePage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      formDisabled: true,
      userDataFormValues: {
        userName: this.props.user.name,
        userEmail: this.props.user.email,
        userUuid: this.props.user.uuid,
        userAvatar: ''
      },
      userDataCardHeaderIcon: faUserEdit,
      headerIconTooltip: 'Edit'
    };
    document.title = 'Home | Social Rox'
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
      getCurrentUserDataRequest: PropTypes.func,
      login: PropTypes.func,
      logout: PropTypes.func,
      uploadAvatar: PropTypes.func
    })
  };
  handleAvatarUpload = (event, file) => {
    event.preventDefault();
    let fileFormData = new FormData();
    fileFormData.append('avatar', file);
    if (this.state.userDataFormValues.userAvatar) {
      this.props.userActions.uploadAvatar(this.props.user.uuid, fileFormData);
      this.forceUpdate()
    }
  };
  toggleUserDataForm = () => {
    if (this.state.formDisabled) {
      // Enable form
      this.setState({
        formDisabled: false,
        headerIconTooltip: 'Save',
        userDataCardHeaderIcon: faUserCheck
      })
    } else {
      // Disable form and possibly - submit
      this.setState({
        formDisabled: true,
        headerIconTooltip: 'Edit',
        userDataCardHeaderIcon: faUserEdit
      })
    }
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
    const { user, classes } = this.props;
    return (
      <article className='b-user-page'>
        <Card className={classes.userCard}>
          <CardHeader title={user.name}
                      action={
                        <Tooltip title={this.state.headerIconTooltip}>
                          <IconButton onClick={this.toggleUserDataForm}>
                            <FontAwesomeIcon className={classes.icon} icon={this.state.userDataCardHeaderIcon}/>
                          </IconButton>
                        </Tooltip>
                      }>
          </CardHeader>
          <CardMedia image={`${APIUrl}user/${user.uuid}/avatar/`} title={user.name} className={classNames(classes.userPhoto)}/>
          <CardActions className={classNames(classes.avatarActions, {[classes.avatarActionsActive]: !formDisabled })}>
            <Tooltip title={'Upload avatar'}>
              <IconButton>
                <label htmlFor={'userAvatar'} className={classes.uploadAvatarLabel}>
                  <FontAwesomeIcon icon={faUpload} className={classes.icon}/>
                  <input id={'userAvatar'} onChange={this.handleUserDataInputChange} type={'file'}
                         className={classNames(classes.fileInput)} value={userDataFormValues.userAvatar}
                         disabled={formDisabled}/>
                </label>
              </IconButton>
            </Tooltip>
          </CardActions>
          <CardContent>
            <TextField name={'userName'} label={'Name'}
                       value={userDataFormValues.userName}  onChange={this.handleUserDataInputChange}
                       disabled={formDisabled} className={classes.userInput}
                       InputProps={{
                        startAdornment: (
                          <InputAdornment position={'start'}> <FontAwesomeIcon className={classes.icon} icon={faUserCircle}/> </InputAdornment>
                        )
                       }}
            />
            <TextField name={'userEmail'} label={'Email'}
                       value={userDataFormValues.userEmail}  onChange={this.handleUserDataInputChange}
                       disabled={formDisabled} className={classes.userInput}
                       InputProps={{
                         startAdornment: (
                           <InputAdornment position={'start'}> <FontAwesomeIcon className={classes.icon} icon={faAt}/> </InputAdornment>
                         )
                       }}
            />
            <TextField name={'userUuid'} label={'ID'}
                       value={userDataFormValues.userUuid} onChange={this.handleUserDataInputChange}
                       disabled={formDisabled} className={classes.userInput}
                       InputProps={{
                         startAdornment: (
                           <InputAdornment position={'start'}> <FontAwesomeIcon className={classes.icon} icon={faFingerprint}/> </InputAdornment>
                         )
                       }}
            />
          </CardContent>
        </Card>
      </article>
    )
  }
}

export default withStyles(styles, { withTheme: true })(HomePage)
