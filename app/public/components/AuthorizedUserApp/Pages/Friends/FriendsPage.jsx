import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UsersList from '../../PagesParts/UsersList/UsersList'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import './styles/main.scss'

class FriendsPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      search: '',
      searchResult: [],
      renderSearchResult: false
    };
    document.title = 'Peoples | Social Rox'
  }
  static propTypes = {
    user: PropTypes.shape({
      uuid: PropTypes.string,
      friends: PropTypes.array
    })
  };
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };
  handleSearch = () => {
    console.log('Search!');
    if (!this.state.renderSearchResult) {
      this.setState({renderSearchResult: true})
    }
  };
  renderSearchResults = () => {
    return (
      <section className='b-friends-page__b-search-results'>
        <h2 className='b-friends-page__b-search-results__header'>Search results:</h2>
        <UsersList type={'search'} data={this.state.searchResult}/>
      </section>
    )
  };
  renderFriendsList = () => {
    return (
      <section className='b-friends-page__b-friends'>
        <h2 className='b-friends-page__b-friends__header'>Your friends</h2>
        <UsersList type={'friends'} data={this.props.user.friends}/>
      </section>
    )
  };
  render () {
    return (
      <article className='b-friends-page'>
        <section className='b-friends-page__b-search'>
          <TextField
          value={this.state.search}
          placeholder='Kirill'
          label='Your friend name:'
          helperText='Click on search button :)'
          onChange={this.handleInputChange}
          name={'search'}
          type={'search'}
          className='b-friends-page__b-search__e-input-container'
          InputProps={{
            endAdornment: (
              <InputAdornment position={'end'}>
                <IconButton onClick={this.handleSearch}><FontAwesomeIcon icon={faSearch}/></IconButton>
              </InputAdornment>
            )
          }}
          />
        </section>
        {this.state.renderSearchResult ? this.renderSearchResults() : this.renderFriendsList()}
      </article>
    )
  }
}

export default FriendsPage