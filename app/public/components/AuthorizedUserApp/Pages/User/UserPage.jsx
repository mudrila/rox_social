import React, {Component} from 'react'
import { APIUrl, baseGetRequest } from "../../../Root/redux/middlewares/APIServiceBases"
import { withStyles } from '@material-ui/core'
import classNames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {
  userPhoto: {
    paddingTop: '67.25%',
    height: 0
  }
};
class UserPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      requestSuccess: false
    };
  }
  componentDidMount () {
    // Get user data
    baseGetRequest(`user/${this.props.match.params.uuid}/details`).then(data => {
      if (data.success) {
        this.setState({
          user: data.user,
          requestSuccess: true
        });
        document.title = `${data.user.name} Profile | Social Rox`
      }
    });
  }
  render () {
    const { requestSuccess, user } = this.state;
    const { classes } = this.props;
    if (requestSuccess) {
      return (
        <article className='b-user-page'>
          <Card>
            <CardHeader title={user.name}/>
            <CardMedia image={`${APIUrl}user/${user.uuid}/avatar/`} title={user.name} className={classNames(classes.userPhoto)}/>
            <CardContent>
              <Typography gutterBottom variant={'title'} component='h2'>{user.email}</Typography>
              <Typography component='p'>My ID: {user.uuid}</Typography>
            </CardContent>
          </Card>
          <Card>
            <Card title={`${user.name} friends`}/>
            <CardContent>
              <List>

              </List>
            </CardContent>
          </Card>
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

export default withStyles(styles)(UserPage)