import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {APIUrl} from "../../../Root/redux/middlewares/APIServiceBases"
import { NavLink, withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from '@material-ui/core/Toolbar'
import Typography from "@material-ui/core/Typography"
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from "@material-ui/core/Divider"
import { 
          faBars, faSignOutAlt, faUser, faUserCog, faUserFriends, faComments,
          faChevronLeft
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles/main.scss'
import './styles/adaptive.scss'

const drawerWidth = 240;

const styles = theme => ({
  avatar: {
    width: 50,
    height: 50,
    marginLeft: 10
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});
class Header extends Component {
  state = {
    menuOpen: false
  };
  static propTypes = {
    handleSignOut: PropTypes.func
  };
  openMenu = () => {
    this.setState({ menuOpen: true })
  };
  closeMenu = () => {
    this.setState({ menuOpen: false })
  };
  handleSignOut = () => {
    this.props.handleSignOut()
  };
  render () {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        <AppBar position={'absolute'} className={classNames('b-main-header', classes.appBar, this.state.menuOpen && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.menuOpen}>
            <IconButton color="inherit" aria-label="Menu" onClick={this.openMenu} className={classNames(classes.menuButton, this.state.menuOpen && classes.hide)}>
              <FontAwesomeIcon icon={faBars} color={'white'}/>
            </IconButton>
            <Typography color={'inherit'} variant='title' className={'b-main-header__slogan'}>Social Rox</Typography>
            <h3 className='b-main-header__greeting'>{this.props.user.name}</h3>
            <Avatar alt={this.props.user.name} src={`${APIUrl}user/${this.props.user.uuid}/avatar/`} className={classNames(classes.avatar)}/>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.menuOpen}
                         variant={'permanent'} anchor={'left'}
                         classes={{
                           paper: classNames(classes.drawerPaper, !this.state.menuOpen && classes.drawerPaperClose)
                         }}>
          <div className={classes.toolbar}>
            <Typography color={'primary'} variant={'title'} className='b-main-header__menu-title'>Menu</Typography>
            <IconButton onClick={this.closeMenu}>
              <FontAwesomeIcon icon={faChevronLeft}/>
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button className={classNames({'active': this.props.match.path.match('/')}, 'b-main-header__link-container')}>
              <NavLink className={'b-main-header__link-container__link'} activeClassName={'active'} to={'/'}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faUser}/>
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </NavLink>
            </ListItem>
            <ListItem button className={classNames({'active': this.props.match.path.match('/friends')}, 'b-main-header__link-container')}>
              <NavLink className={'b-main-header__link-container__link'} activeClassName={'active'} to={'/friends'}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faUserFriends}/>
                </ListItemIcon>
                <ListItemText>Friends</ListItemText>
              </NavLink>
            </ListItem>
            <ListItem button className={classNames({'active': this.props.match.path.match('/messages')}, 'b-main-header__link-container')}>
              <NavLink className={'b-main-header__link-container__link'} activeClassName={'active'} to={'/messages'}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faComments}/>
                </ListItemIcon>
                <ListItemText>Messages</ListItemText>
              </NavLink>
            </ListItem>
            <ListItem button className={classNames({'active': this.props.match.path.match('/settings')}, 'b-main-header__link-container')}>
              <NavLink className={'b-main-header__link-container__link'} activeClassName={'active'} to={'/settings'}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faUserCog}/>
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </NavLink>
            </ListItem>
            <ListItem button onClick={this.handleSignOut}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faSignOutAlt}/>
              </ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Header))