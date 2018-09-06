import React, {Component} from 'react'
import { APIUrl, baseGetRequest } from "../../../../../shared/baseRequest/index"
import { withRouter } from 'react-router-dom'
import { subscribeRequest } from "../Friends/redux/actions"
import { store } from '../../../../index'
import { withStyles } from '@material-ui/core'
import classNames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UsersList from '../../PagesParts/UsersList/UsersList'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import {faAt, faFingerprint, faUserCircle, faUserPlus} from "@fortawesome/free-solid-svg-icons"

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
class UserPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      requestSuccess: false,
      headerIconTooltip: 'Subscribe',
      userDataCardHeaderIcon: faUserPlus
    };
  }
  getUserData = () => {
    baseGetRequest(`user/${this.props.match.params.uuid}/details`).then(data => {
      if (data.success) {
        this.setState({
          user: data.user,
          requestSuccess: true
        });
        document.title = `${data.user.name} Profile | Social Rox`
      }
    });
  };
  componentDidMount () {
    this.getUserData()
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.uuid !== this.props.match.params.uuid) {
      this.getUserData()
    }
  }
  handleSubscribe = () => {
    store.dispatch(subscribeRequest(this.props.match.params.uuid));
  };
  render () {
    const { requestSuccess, user } = this.state;
    const { classes } = this.props;
    if (requestSuccess) {
      return (
        <article className='b-user-page'>
          <Grid container spacing={16} className={classes.gridContainer}>
            <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
              <Card>
                <CardHeader title={user.name}
                            action={
                              <Tooltip title={this.state.headerIconTooltip}>
                                <IconButton onClick={this.handleSubscribe}>
                                  <FontAwesomeIcon className={classes.icon} icon={this.state.userDataCardHeaderIcon}/>
                                </IconButton>
                              </Tooltip>
                            }>
                </CardHeader>
                <CardMedia image={`${APIUrl}user/${user.uuid}/avatar/`} title={user.name} className={classNames(classes.userPhoto)}/>
                <CardContent>
                  <TextField label={'Name'} value={user.name} disabled={true} className={classes.userInput}
                             InputProps={{
                               startAdornment: (
                                 <InputAdornment position={'start'}> <FontAwesomeIcon className={classes.icon} icon={faUserCircle}/> </InputAdornment>
                               )
                             }}
                  />
                  <TextField label={'Email'} value={user.email} disabled={true} className={classes.userInput}
                             InputProps={{
                               startAdornment: (
                                 <InputAdornment position={'start'}> <FontAwesomeIcon className={classes.icon} icon={faAt}/> </InputAdornment>
                               )
                             }}
                  />
                  <TextField label={'ID'} value={user.uuid} disabled={true} className={classes.userInput}
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
    } else {
      return (
        <React.Fragment>
          <CircularProgress/>
          <div>Cannot get data of this user. Possible, that this user does not exist O_O </div>
        </React.Fragment>
      )
    }
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(UserPage))
