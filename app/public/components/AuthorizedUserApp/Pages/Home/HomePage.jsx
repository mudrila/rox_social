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
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import UsersList from '../../PagesParts/UsersList/UsersList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUpload, faAt, faFingerprint, faUserEdit , faUserCheck} from '@fortawesome/free-solid-svg-icons'
import './styles/main.scss'
import './styles/adaptive.scss'

const styles = theme => ({
  gridContainer: {
    alignItems: 'flex-start',
    alignContent: 'flex-start'
  },
  userPhoto: {
    paddingTop: '57.25%',
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
  },
  usersListHeader: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  usersListContent: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  usersListGridItem: {
    margin: '16px auto'
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
      if (this.state.userDataFormValues.userAvatar) {
        let file = document.getElementById('userAvatar').files[0];
        if (file) {
          let fileFormData = new FormData();
          fileFormData.append('avatar', file);
          this.props.userActions.uploadAvatar(this.props.user.uuid, fileFormData);
        }
      }
      this.setState({
        formDisabled: true,
        headerIconTooltip: 'Edit',
        userDataCardHeaderIcon: faUserEdit
      })
    }
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
        <Grid container spacing={16} className={classes.gridContainer}>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Card>
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
                             className={classNames(classes.fileInput)} disabled={formDisabled} name={'userAvatar'}/>
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
          </Grid>
          <Grid container item xs={12} sm={12} md={6} lg={8} xl={8}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title={'Friends'} className={classes.usersListHeader}/>
                <CardContent className={classes.usersListContent}>
                  <UsersList data={user.friends} type={'friends'}/>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} className={classes.usersListGridItem}>
              <Card>
                <CardHeader title={'Subscribers'} className={classes.usersListHeader}/>
                <CardContent className={classes.usersListContent}>
                  <UsersList data={user.subscribers} type={'subscribers'}/>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} className={classes.usersListGridItem}>
              <Card>
                <CardHeader title={'Subscriptions'} className={classes.usersListHeader}/>
                <CardContent className={classes.usersListContent}>
                  <UsersList data={user.subscriptions} type={'subscriptions'}/>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </article>
    )
  }
}

export default withStyles(styles, { withTheme: true })(HomePage)
