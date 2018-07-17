import React from 'react'
import { APIUrl } from '../../../Root/redux/middlewares/APIServiceBases'
import {NavLink} from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

const UsersList = (props) => {
  if (props.data.length > 0) {
    return (
      <List className='users-list'>
        {props.data.map(user => {
          return (
            <NavLink className='users-list__user-link' key={user.uuid} to={`/users/${user.uuid}`}>
              <ListItem divider button>
                <ListItemAvatar>
                  <Avatar src={`${APIUrl}user/${user.uuid}/avatar/`}/>
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.email} />
                {props.type !== 'friends' ? <ListItemIcon><FontAwesomeIcon icon={faUserPlus}/></ListItemIcon> : ''}
              </ListItem>
            </NavLink>
          )
        })}
      </List>
    )
  } else {
    return <div className='no-data-found'>Nothing found :(</div>
  }
};
export default UsersList